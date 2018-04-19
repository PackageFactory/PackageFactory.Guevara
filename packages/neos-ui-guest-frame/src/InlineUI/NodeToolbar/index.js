import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'classnames';
import debounce from 'lodash.debounce';

import {
    findNodeInGuestFrame,
    getAbsolutePositionOfElementInGuestFrame,
    isElementVisibleInGuestFrame,
    animateScrollToElementInGuestFrame,
    getGuestFrameWindow
} from '@neos-project/neos-ui-guest-frame/src/dom';

import {neos} from '@neos-project/neos-ui-decorators';

import {
    AddNode,
    CopySelectedNode,
    CutSelectedNode,
    DeleteSelectedNode,
    HideSelectedNode,
    PasteClipBoardNode
} from './Buttons/index';
import style from './style.css';

@neos(globalRegistry => ({
    nodeTypesRegistry: globalRegistry.get('@neos-project/neos-ui-contentrepository'),
    i18nRegistry: globalRegistry.get('i18n')
}))
export default class NodeToolbar extends PureComponent {
    static propTypes = {
        contextPath: PropTypes.string,
        fusionPath: PropTypes.string,
        destructiveOperationsAreDisabled: PropTypes.bool.isRequired,
        // Flag triggered by content tree that tells inlineUI that it should scroll into view
        shouldScrollIntoView: PropTypes.bool.isRequired,
        isCut: PropTypes.bool.isRequired,
        isCopied: PropTypes.bool.isRequired,
        canBeDeleted: PropTypes.bool.isRequired,
        canBeEdited: PropTypes.bool.isRequired,
        visibilityCanBeToggled: PropTypes.bool.isRequired,
        // Unsets the flag
        requestScrollIntoView: PropTypes.func.isRequired,
        i18nRegistry: PropTypes.object.isRequired
    };

    state = {
        isSticky: false
    };

    iframeWindow = getGuestFrameWindow();

    updateStickyness = () => {
        const nodeElement = findNodeInGuestFrame(this.props.contextPath, this.props.fusionPath);
        if (nodeElement) {
            const {isSticky} = this.state;
            const {top, bottom} = nodeElement.getBoundingClientRect();
            const shouldBeSticky = top < 50 && bottom > 0;

            if (isSticky !== shouldBeSticky) {
                this.setState({isSticky: shouldBeSticky});
            }
        }
    };

    componentDidMount() {
        this.iframeWindow.addEventListener('resize', debounce(() => this.forceUpdate(), 20));
        this.iframeWindow.addEventListener('scroll', debounce(this.updateStickyness, 5));
        this.iframeWindow.addEventListener('load', debounce(() => this.forceUpdate(), 5));
    }

    componentDidUpdate() {
        // Only scroll into view when triggered from content tree (on focus change)
        if (this.props.shouldScrollIntoView) {
            this.scrollIntoView();
            this.props.requestScrollIntoView(false);
        }

        this.updateStickyness();
    }

    scrollIntoView() {
        const nodeElement = findNodeInGuestFrame(this.props.contextPath, this.props.fusionPath);

        if (nodeElement && !isElementVisibleInGuestFrame(nodeElement)) {
            animateScrollToElementInGuestFrame(nodeElement, 100);
        }
    }

    render() {
        const {
            contextPath,
            fusionPath,
            destructiveOperationsAreDisabled,
            isCut,
            isCopied,
            canBeDeleted,
            canBeEdited,
            visibilityCanBeToggled,
            i18nRegistry
        } = this.props;

        if (!contextPath) {
            return null;
        }

        const props = {
            i18nRegistry,
            contextPath,
            fusionPath,
            destructiveOperationsAreDisabled,
            canBeDeleted,
            canBeEdited,
            visibilityCanBeToggled,
            className: style.toolBar__btnGroup__btn
        };

        const nodeElement = findNodeInGuestFrame(contextPath, fusionPath);
        const {top, right} = getAbsolutePositionOfElementInGuestFrame(nodeElement);

        // TODO: hardcoded dimensions
        const TOOLBAR_WIDTH = 200;
        const TOOLBAR_HEIGHT = 50;

        const rect = nodeElement.getBoundingClientRect();
        const toolbarPosition = {
            top: top - TOOLBAR_HEIGHT
        };
        if (rect.right < TOOLBAR_WIDTH) {
            toolbarPosition.left = 0;
        } else {
            toolbarPosition.right = right;
        }

        const {isSticky} = this.state;
        const classNames = mergeClassNames({
            [style.toolBar]: true,
            [style['toolBar--isSticky']]: isSticky
        });

        return (
            <div className={classNames} style={toolbarPosition}>
                <div className={style.toolBar__btnGroup}>
                    <AddNode {...props}/>
                    <HideSelectedNode {...props}/>
                    <CopySelectedNode {...props} isActive={isCopied}/>
                    <CutSelectedNode {...props} isActive={isCut}/>
                    <PasteClipBoardNode {...props}/>
                    <DeleteSelectedNode {...props}/>
                </div>
            </div>
        );
    }
}
