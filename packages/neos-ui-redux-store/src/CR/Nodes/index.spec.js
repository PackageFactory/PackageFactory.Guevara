import test from 'ava';
import Immutable, {Map} from 'immutable';

import {actionTypes, reducer, actions, selectors} from './index';

import {actionTypes as system} from '../../System/index';

test(`should export actionTypes`, t => {
    t.not(actionTypes, undefined);
    t.is(typeof (actionTypes.ADD), 'string');
    t.is(typeof (actionTypes.FOCUS), 'string');
    t.is(typeof (actionTypes.UNFOCUS), 'string');
    t.is(typeof (actionTypes.BLUR), 'string');
    t.is(typeof (actionTypes.HOVER), 'string');
    t.is(typeof (actionTypes.UNHOVER), 'string');
});

test(`should export action creators`, t => {
    t.not(actions, undefined);
    t.is(typeof (actions.add), 'function');
    t.is(typeof (actions.focus), 'function');
    t.is(typeof (actions.unFocus), 'function');
    t.is(typeof (actions.blur), 'function');
    t.is(typeof (actions.hover), 'function');
    t.is(typeof (actions.unhover), 'function');
});

test(`should export a reducer`, t => {
    t.not(reducer, undefined);
    t.is(typeof (reducer), 'function');
});

test(`should export selectors`, t => {
    t.not(selectors, undefined);
});

test(`The reducer should create a valid initial state`, t => {
    const state = new Map({});
    const nextState = reducer(state, {
        type: system.INIT
    });

    t.true(nextState.get('cr').get('nodes') instanceof Map);
    t.true(nextState.get('cr').get('nodes').get('byContextPath') instanceof Map);
    t.is(typeof (nextState.get('cr').get('nodes').get('siteNode')), 'string');
    t.true(nextState.get('cr').get('nodes').get('focused') instanceof Map);
    t.is(typeof (nextState.get('cr').get('nodes').get('focused').get('contextPath')), 'string');
    t.is(typeof (nextState.get('cr').get('nodes').get('focused').get('typoscriptPath')), 'string');
    t.true(nextState.get('cr').get('nodes').get('hovered') instanceof Map);
    t.is(typeof (nextState.get('cr').get('nodes').get('hovered').get('contextPath')), 'string');
    t.is(typeof (nextState.get('cr').get('nodes').get('hovered').get('typoscriptPath')), 'string');
});

test(`The reducer should take initially existing nodes into account`, t => {
    const state = new Map({});
    const serverState = Immutable.fromJS({
        cr: {
            nodes: {
                byContextPath: {
                    someContextPath: {
                        some: 'property'
                    }
                }
            }
        }
    });
    const nextState = reducer(state, {
        type: system.INIT,
        payload: serverState
    });

    t.true(nextState.get('cr').get('nodes').get('byContextPath') instanceof Map);
    t.not(nextState.get('cr').get('nodes').get('byContextPath').get('someContextPath'), undefined);
    t.deepEqual(nextState.get('cr').get('nodes').get('byContextPath').toJS(), {
        someContextPath: {
            some: 'property'
        }
    });
});

test(`The reducer should take an initially configured siteNode into account`, t => {
    const state = new Map({});
    const serverState = Immutable.fromJS({
        cr: {
            nodes: {
                siteNode: 'theSiteNode'
            }
        }
    });
    const nextState = reducer(state, {
        type: system.INIT,
        payload: serverState
    });

    t.is(nextState.get('cr').get('nodes').get('siteNode'), 'theSiteNode');
});

test(`The reducer should add nodes to the store`, t => {
    const state = Immutable.fromJS({
        cr: {
            nodes: {
                byContextPath: {}
            }
        }
    });
    const contextPath = '/path/top/my/node@user-username;language=en_US';
    const nextState = reducer(state, actions.add(contextPath, {
        foo: 'bar'
    }));

    const addedItem = nextState.get('cr').get('nodes').get('byContextPath').get(contextPath);

    t.not(addedItem, undefined);
    t.true(addedItem instanceof Map);
    t.deepEqual(addedItem.toJS(), {
        foo: 'bar'
    });
});
