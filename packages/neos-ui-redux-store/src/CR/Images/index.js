import {Map} from 'immutable';
import {createAction} from 'redux-actions';
import {$set, $all} from 'plow-js';

import {handleActions} from '@neos-project/utils-redux';
import {actionTypes as system} from '../../System/index';

import * as selectors from './selectors';
import {fromJSOrdered} from '@neos-project/utils-helpers';

const START_LOADING = '@neos/neos-ui/CR/Images/START_LOADING';
const FINISH_LOADING = '@neos/neos-ui/CR/Images/FINISH_LOADING';
//
// Export the action types
//
export const actionTypes = {
    START_LOADING,
    FINISH_LOADING
};

/**
 * Adds a node to the application state
 *
 * @param {String} imageUuid The image's UUID for which to start loading
 */
const startLoading = createAction(START_LOADING, imageUuid => ({
    imageUuid
}));

const finishLoading = createAction(FINISH_LOADING, (imageUuid, loadedData) => ({
    imageUuid,
    loadedData
}));

//
// Export the actions
//
export const actions = {
    startLoading,
    finishLoading
};

//
// Export the reducer
//
export const reducer = handleActions({
    [system.BOOT]: () => $set(
        'cr.images',
        new Map({
            byUuid: new Map()
        })
    ),
    [START_LOADING]: ({imageUuid}) => $set(['cr', 'images', 'byUuid', imageUuid, 'status'], 'LOADING'),
    [FINISH_LOADING]: ({imageUuid, loadedData}) => $all(
        $set(['cr', 'images', 'byUuid', imageUuid], fromJSOrdered(loadedData)),
        $set(['cr', 'images', 'byUuid', imageUuid, 'status'], 'LOADED')
    )
});

//
// Export the selectors
//
export {selectors};
