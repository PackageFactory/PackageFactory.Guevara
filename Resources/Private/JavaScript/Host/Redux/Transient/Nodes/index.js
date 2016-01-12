import {immutableOperations} from 'Shared/Util/';
import {createAction, handleActions} from 'redux-actions';

const {$set, $merge} = immutableOperations;

const ADD = '@packagefactory/guevara/Transient/Nodes/ADD';
const ADD_BULK = '@packagefactory/guevara/Transient/Nodes/ADD_BULK';

export default handleActions({
    [ADD]: (state, action) => $set(state, ['nodes', 'byContextPath', action.payload.contextPath], action.payload.data),
    [ADD_BULK]: state => $merge(state, 'nodes.byContextPath', state.nodes)
});

/**
 * Adds a node to the application state
 *
 * @param {String} contextPath The context path of the ndoe
 * @param {Object} data        The node's data
 */
export const add = createAction(ADD, (contextPath, data) => ({
    contextPath,
    data
}));

/**
 * Adds multiple nodes to the application state
 *
 * @param {Array} nodes A list of nodes
 */
export const addBulk = createAction(ADD_BULK, nodes => ({nodes}));
