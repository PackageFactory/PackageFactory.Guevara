import {$get} from 'plow-js';
import {createSelector, defaultMemoize} from 'reselect';

import {getCurrentContentCanvasContextPath} from './../../UI/ContentCanvas/selectors';

import {getAllowedNodeTypesTakingAutoCreatedIntoAccount} from './helpers';

const nodes = $get(['cr', 'nodes', 'byContextPath']);
const focused = $get('cr.nodes.focused.contextPath');

const parentNodeContextPath = contextPath => {
    if (typeof contextPath !== 'string') {
        return null;
    }

    const [path, context] = contextPath.split('@');

    return `${path.substr(0, path.lastIndexOf('/'))}@${context}`;
};

export const isDocumentNodeSelectedSelector = createSelector(
    [
        focused,
        getCurrentContentCanvasContextPath
    ],
    (focused, currentContentCanvasContextPath) => {
        return !focused || (focused === currentContentCanvasContextPath);
    }
);

// PERFORMANCE: All selectors should return ImmutableJS objects,
// do not call `.toJS()` anywhere here
export const nodeByContextPath = state => contextPath =>
    $get(['cr', 'nodes', 'byContextPath', contextPath], state);

export const makeGetDocumentNodes = nodeTypesRegistry => createSelector(
    [
        nodes
    ],
    nodesMap => {
        const documentSubNodeTypes = nodeTypesRegistry.getSubTypesOf(nodeTypesRegistry.getRole('document'));

        return nodesMap.filter(node => documentSubNodeTypes.includes(node.get('nodeType')));
    }
);

export const byContextPathSelector = defaultMemoize(
    contextPath => createSelector(
        [
            nodeByContextPath
        ],
        getNodeByContextPath => getNodeByContextPath(contextPath)
    )
);

export const parentNodeSelector = state => baseNode =>
    byContextPathSelector(parentNodeContextPath($get('contextPath', baseNode)))(state);

export const grandParentNodeSelector = state => baseNode =>
    byContextPathSelector(parentNodeContextPath(parentNodeContextPath($get('contextPath', baseNode))))(state);

export const focusedNodePathSelector = createSelector(
    [
        focused,
        getCurrentContentCanvasContextPath
    ],
    (focused, currentContentCanvasContextPath) => {
        return focused || currentContentCanvasContextPath;
    }
);

export const focusedSelector = createSelector(
    [
        focusedNodePathSelector,
        nodeByContextPath
    ],
    (focusedNodePath, getNodeByContextPath) =>
        getNodeByContextPath(focusedNodePath)
);

export const focusedParentSelector = createSelector(
    [
        focusedSelector,
        state => state
    ],
    (focusedNode, state) => {
        if (!focusedNode) {
            return undefined;
        }

        return parentNodeSelector(state)(focusedNode);
    }
);

export const focusedGrandParentSelector = createSelector(
    [
        focusedParentSelector,
        state => state
    ],
    (focusedParentNode, state) => {
        if (!focusedParentNode) {
            return undefined;
        }

        return parentNodeSelector(state)(focusedParentNode);
    }
);

/**
 * This selector returns a function which you need to pass in the node-Type-Registry
 */
export const getAllowedSiblingNodeTypesForFocusedNodeSelector = createSelector(
    [
        focusedSelector,
        focusedParentSelector,
        focusedGrandParentSelector
    ],
    (focusedNode, focusedNodeParent, focusedNodeGrandParent) =>
        defaultMemoize(nodeTypesRegistry => {
            if (!focusedNode) {
                return [];
            }

            return getAllowedNodeTypesTakingAutoCreatedIntoAccount(
                focusedNodeParent,
                focusedNodeGrandParent,
                nodeTypesRegistry
            );
        })
);

export const clipboardNodeContextPathSelector = createSelector(
    [
        $get('cr.nodes.clipboard')
    ],
    clipboardNodeContextPath => clipboardNodeContextPath
);

export const clipboardIsEmptySelector = createSelector(
    [
        $get('cr.nodes.clipboard')
    ],
    clipboardNodePath => Boolean(clipboardNodePath)
);

export const canBePastedAlongsideSelector = createSelector(
    [
        nodeByContextPath,
        parentNodeSelector,
        grandParentNodeSelector
    ],
    (getNodeByContextPath, getParentNode, getGrandParentNode) =>
        (subjectContextPath, referenceContextPath, nodeTypesRegistry) => {
            const subject = getNodeByContextPath(subjectContextPath);
            const reference = getNodeByContextPath(referenceContextPath);
            const referenceParent = getParentNode(reference);
            const referenceGrandParent = getGrandParentNode(reference);
            const allowedNodeTypes = getAllowedNodeTypesTakingAutoCreatedIntoAccount(
                referenceParent,
                referenceGrandParent,
                nodeTypesRegistry
            );

            return allowedNodeTypes.indexOf($get('nodeType', subject)) !== -1;
        }
);

export const canBePastedIntoSelector = createSelector(
    [
        nodeByContextPath,
        parentNodeSelector
    ],
    (getNodeByContextPath, getParentNode) =>
        (subjectContextPath, referenceContextPath, nodeTypesRegistry) => {
            const subject = getNodeByContextPath(subjectContextPath);
            const reference = getNodeByContextPath(referenceContextPath);
            const referenceParent = getParentNode(reference);
            const allowedNodeTypes = getAllowedNodeTypesTakingAutoCreatedIntoAccount(
                reference,
                referenceParent,
                nodeTypesRegistry
            );

            return allowedNodeTypes.indexOf($get('nodeType', subject)) !== -1;
        }
);

export const canBePastedSelector = createSelector(
    [
        canBePastedAlongsideSelector,
        canBePastedIntoSelector
    ],
    (canBePastedAlongside, canBePastedInto) =>
        (...args) => canBePastedAlongside(...args) || canBePastedInto(...args)

);
