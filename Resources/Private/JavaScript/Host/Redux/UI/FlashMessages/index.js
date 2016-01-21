import Immutable from 'immutable';
import {immutableOperations} from 'Shared/Util/';
import {createAction, handleActions} from 'redux-actions';

const {$set, $delete} = immutableOperations;

const ADD = '@packagefactory/guevara/UI/FlashMessages/ADD';
const REMOVE = '@packagefactory/guevara/UI/FlashMessages/REMOVE';
const initialState = Immutable.fromJS({
    test1: {
        id: 'test1',
        message: 'Dies ist ein Test',
        severity: 'info'
    },
    test2: {
        id: 'test2',
        message: 'Dies ist ein Fehler',
        severity: 'error'
    },
    test3: {
        id: 'test3',
        message: 'Dies ist ein Erfolg',
        severity: 'success'
    }
});

export default handleActions({
    [ADD]: (state, action) => $set(state, `${action.payload.id}`, action.payload),
    [REMOVE]: (state, action) => $delete(state, `${action.payload.id}`)
}, initialState);

/**
 * Adds a flash message
 *
 * @param {String} id       Must be unique within the ui.flashMessages portion of the store
 * @param {String} message  The message which will be displayed to in the UI.
 * @param {String} severity
 * @param {Integer} timeout An (optional) timeout, after which the flash message will disappear
 * @return {Object}
 */
export const add = createAction(ADD, (id, message, severity, timeout = 0) => ({
    severity: severity.toLowerCase(),
    id,
    message,
    timeout
}));

/**
 * Removes a flash message
 *
 * @param  {String} id The flashMessage id to delete.
 */
export const remove = createAction(REMOVE, id => ({
    id
}));
