import {takeEvery, put, call, select} from 'redux-saga/effects';
import {$get} from 'plow-js';

import {actionTypes, actions, selectors} from '@neos-project/neos-ui-redux-store';
import backend from '@neos-project/neos-ui-backend-connector';

const {publishableNodesInDocumentSelector, baseWorkspaceSelector} = selectors.CR.Workspaces;

export function * watchPersist() {
    const {change} = backend.get().endpoints;

    yield takeEvery(actionTypes.Changes.PERSIST, function * (action) {
        const changes = action.payload.changes;

        yield put(actions.UI.Remote.startSaving());

        try {
            const feedback = yield call(change, changes);
            yield put(actions.UI.Remote.finishSaving());
            yield put(actions.ServerFeedback.handleServerFeedback(feedback));

            const state = yield select();
            const isAutoPublishingEnabled = $get('user.settings.isAutoPublishingEnabled', state);

            if (isAutoPublishingEnabled) {
                const baseWorkspace = baseWorkspaceSelector(state);
                const publishableNodesInDocument = publishableNodesInDocumentSelector(state);
                yield put(actions.CR.Workspaces.publish(publishableNodesInDocument.map($get('contextPath')), baseWorkspace));
            }
        } catch (error) {
            console.error('Failed to persist changes', error);
        }
    });
}
