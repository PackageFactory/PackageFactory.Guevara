import {$get} from 'plow-js';
import {createSelector} from 'reselect';

import {selectors as nodes} from '../../CR/Nodes/index';
import {getCurrentContentCanvasContextPath} from './../ContentCanvas/selectors';

export const getFocused = $get('ui.pageTree.isFocused');
export const getUncollapsed = $get('ui.pageTree.uncollapsed');
export const getLoading = $get('ui.pageTree.loading');
export const getErrors = $get('ui.pageTree.errors');

export const getFocusedNodeContextPathSelector = createSelector(
    [
        getFocused
    ],
    focusedNodeContextPath => focusedNodeContextPath
);

export const getUncollapsedContextPaths = createSelector(
    [
        getUncollapsed
    ],
    list => list.toJS()
);

export const getIsLoading = createSelector(
    [
        getLoading
    ],
    list => Boolean(list.toJS().length)
);

//
// TODO: NODETYPE REFACTORING - Fix calls of this
//
export const getTreeNodeSelector = createSelector(
    [
        getCurrentContentCanvasContextPath,
        getFocused,
        getUncollapsed,
        getLoading,
        getErrors,
        state => state
    ],
    (
        activeNodeContextPath,
        focusedNodeContextPath,
        uncollapsedNodeContextPaths,
        loadingNodeContextPaths,
        errorNodeContextPaths,
        state
    ) => (contextPath, nodeTypeFilterForChildren = []) => {
        //
        // Try to grab the node
        //
        const node = nodes.byContextPathSelector(contextPath)(state);
        const isNodeTypeValid = nodeType => Boolean(
            nodeTypeFilterForChildren.length === 0 ||
            nodeTypeFilterForChildren.indexOf(nodeType) > -1
        );

        //
        // Check if the requested node is existent
        //
        if (node) {
            //
            // Check for valid child nodes
            //
            const validChildren = $get('children', node).filter(node => isNodeTypeValid($get('nodeType', node)));
            const contextPath = $get('contextPath', node);

            //
            // Turn the node into a data structure, that can be consumed by a tree view
            //
            return {
                contextPath,
                label: $get('label', node),
                uri: $get('uri', node),
                nodeType: $get('nodeType', node),
                isActive: contextPath === activeNodeContextPath,
                isFocused: contextPath === focusedNodeContextPath,
                isHidden: $get('properties._hidden', node),
                isHiddenInIndex: $get('properties._hiddenInIndex', node),
                isCollapsed: !uncollapsedNodeContextPaths.contains(contextPath),
                isLoading: loadingNodeContextPaths.contains(contextPath),
                hasError: errorNodeContextPaths.contains(contextPath),
                hasChildren: validChildren.length > 0,
                children: validChildren.map($get('contextPath'))
            };
        }

        return null;
    }
);
