import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import assign from 'lodash.assign';
import registry from '@reduct/registry';

import {configureStore} from './Redux/';

import * as feedbackHandler from './Service/FeedbackHandler/';

import {
    ContentView,
    FooterBar,
    TopBar,
    LeftSideBar,
    OffCanvas,
    RightSideBar,
    ContextBar,
    FlashMessageContainer
} from './Containers/';
import {
    backend,
    nodeTypeManager,
    nodeTreeService,
    tabManager,
    changeManager,
    feedbackManager,
    publishingService,
    i18n
} from './Service/';

import style from './style.css';

// Initialize the backend application on load.
document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('appContainer');
    const firstTabUri = appContainer.dataset.firstTab;
    const csrfToken = appContainer.dataset.csrfToken;
    const serverState = JSON.parse(appContainer.querySelector('[data-json="initialState"]').innerHTML);
    const translations = JSON.parse(appContainer.querySelector('[data-json="translations"]').innerHTML);
    const nodeTypeSchema = JSON.parse(appContainer.querySelector('[data-json="nodeTypeSchema"]').innerHTML);
    const store = configureStore({serverState});

    console.log(store.getState());

    nodeTypeManager.initializeWithNodeTypeSchema(nodeTypeSchema);

    ReactDOM.render(
        <div className={style.applicationWrapper}>
            <Provider store={store}>
                <div>
                    <div id="dialog" />
                    <FlashMessageContainer />
                    <TopBar />
                    <ContextBar />
                    <OffCanvas />
                    <LeftSideBar />
                    <ContentView />
                    <RightSideBar />
                    <FooterBar />
              </div>
            </Provider>
        </div>,
        appContainer
    );

    // Bootstrap the backend services
    assign(backend, {
        tabManager: tabManager(store),
        changeManager: changeManager(store, csrfToken),
        feedbackManager: feedbackManager(store),
        publishingService: publishingService(store, csrfToken),
        nodeTreeService: nodeTreeService(store, csrfToken),
        i18n: i18n(translations),

        asyncComponents: {
            feedbackHandlers: registry()
        }
    });

    backend.tabManager.createTab(firstTabUri);

    // Register FeedbackHandlers
    backend.asyncComponents.feedbackHandlers.registerAll({
        'PackageFactory.Guevara:Success': feedbackHandler.flashMessage,
        'PackageFactory.Guevara:Error': feedbackHandler.flashMessage,
        'PackageFactory.Guevara:Info': feedbackHandler.logToConsole,
        'PackageFactory.Guevara:UpdateWorkspaceInfo': feedbackHandler.updateWorkspaceInfo,
        'PackageFactory.Guevara:ReloadDocument': feedbackHandler.reloadDocument
    });
});
