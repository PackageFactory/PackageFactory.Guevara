import 'core-js/shim';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {put} from 'redux-saga/effects';
import {Map} from 'immutable';
import merge from 'lodash.merge';

import {reducer, actions} from '@neos-project/neos-ui-redux-store';
import {createConsumerApi} from '@neos-project/neos-ui-extensibility';
import fetchWithErrorHandling from '@neos-project/neos-ui-backend-connector/src/FetchWithErrorHandling';
import {SynchronousMetaRegistry} from '@neos-project/neos-ui-extensibility/src/registry';
import {delay} from '@neos-project/utils-helpers';
import backend from '@neos-project/neos-ui-backend-connector';

import allSagas from './Sagas/index';
import * as system from './System';
import localStorageMiddleware from './localStorageMiddleware';
import Root from './Containers/Root';
import apiExposureMap from './apiExposureMap';
const devToolsArePresent = typeof window === 'object' && typeof window.devToolsExtension !== 'undefined';
const devToolsStoreEnhancer = () => devToolsArePresent ? window.devToolsExtension() : f => f;
const sagaMiddleWare = createSagaMiddleware();
const store = createStore(reducer, new Map(), compose(
    applyMiddleware(sagaMiddleWare, localStorageMiddleware),
    devToolsStoreEnhancer()
));

const manifests = [];
const globalRegistry = new SynchronousMetaRegistry(`The global registry`);

//
// Create the host plugin api and load local manifests
//
createConsumerApi(manifests, apiExposureMap);
require('./manifest');
require('@neos-project/neos-ui-contentrepository');
require('@neos-project/neos-ui-editors');
require('@neos-project/neos-ui-views');
require('@neos-project/neos-ui-guest-frame');
require('@neos-project/neos-ui-ckeditor-bindings');
require('@neos-project/neos-ui-validators');
require('@neos-project/neos-ui-i18n/src/manifest');

//
// The main application
//
function * application() {
    const appContainer = yield system.getAppContainer;

    //
    // We'll show just some loading screen,
    // until we're good to go
    //
    ReactDOM.render(
        <div style={{width: '100vw', height: '100vh', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <h1>Loading...</h1>
        </div>,
        appContainer
    );

    //
    // Initialize Neos JS API
    //
    yield system.getNeos;

    //
    // Load frontend configuration very early, as we want to make it available in manifests
    //
    const frontendConfiguration = yield system.getFrontendConfiguration;

    //
    // Initialize extensions
    //
    manifests
        .map(manifest => manifest[Object.keys(manifest)[0]])
        .forEach(({bootstrap}) => bootstrap(globalRegistry, {store, frontendConfiguration}));

    const configuration = yield system.getConfiguration;

    //
    // Bootstrap the saga middleware with initial sagas
    //
    allSagas.forEach(saga => sagaMiddleWare.run(saga, {store, globalRegistry, configuration}));

    //
    // Tell everybody, that we're booting now
    //
    store.dispatch(actions.System.boot());

    const {getJsonResource} = backend.get().endpoints;
    //
    // Load node types
    //
    const groupsAndRoles = yield system.getNodeTypes;
    const nodeTypesSchema = yield getJsonResource(configuration.endpoints.nodeTypeSchema);
    const nodeTypesRegistry = globalRegistry.get('@neos-project/neos-ui-contentrepository');
    Object.keys(nodeTypesSchema.nodeTypes).forEach(nodeTypeName => {
        nodeTypesRegistry.set(nodeTypeName, {
            ...nodeTypesSchema.nodeTypes[nodeTypeName],
            name: nodeTypeName
        });
    });
    nodeTypesRegistry.setConstraints(nodeTypesSchema.constraints);
    nodeTypesRegistry.setInheritanceMap(nodeTypesSchema.inheritanceMap);
    nodeTypesRegistry.setGroups(groupsAndRoles.groups);
    nodeTypesRegistry.setRoles(groupsAndRoles.roles);

    //
    // Load translations
    //
    const translations = yield getJsonResource(configuration.endpoints.translations);
    const i18nRegistry = globalRegistry.get('i18n');
    i18nRegistry.setTranslations(translations);

    const frontendConfigurationRegistry = globalRegistry.get('frontendConfiguration');

    Object.keys(frontendConfiguration).forEach(key => {
        frontendConfigurationRegistry.set(key, {
            ...frontendConfiguration[key]
        });
    });

    //
    // Hydrate server state
    // Deep merges state fetched from server with the state saved in the local storage
    //
    const serverState = yield system.getServerState;
    const persistedState = localStorage.getItem('persistedState') ? JSON.parse(localStorage.getItem('persistedState')) : {};
    const mergedState = merge({}, serverState, persistedState);
    yield put(actions.System.init(mergedState));

    //
    // Just make sure that everybody does their initialization homework
    //
    yield delay(0);

    //
    // Inform everybody, that we're ready now
    //
    yield put(actions.System.ready());

    fetchWithErrorHandling.registerAuthenticationErrorHandler(() => {
        store.dispatch(actions.System.authenticationTimeout());
    });

    fetchWithErrorHandling.registerGeneralErrorHandler((message = 'unknown error') => {
        store.dispatch(actions.UI.FlashMessages.add('fetch error', message, 'error'));
    });

    const menu = yield system.getMenu;

    //
    // After everything was initilalized correctly, render the application itself.
    //
    ReactDOM.render(
        <Root
            globalRegistry={globalRegistry}
            menu={menu}
            configuration={configuration}
            store={store}
            />,
        appContainer
    );
}

sagaMiddleWare.run(application);
