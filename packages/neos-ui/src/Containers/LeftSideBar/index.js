import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'classnames';
import {connect} from 'react-redux';
import {$transform, $get, $or} from 'plow-js';

import {selectors} from '@neos-project/neos-ui-redux-store';

import SideBar from '@neos-project/react-ui-components/src/SideBar/';
import {neos} from '@neos-project/neos-ui-decorators';

import style from './style.css';

@neos(globalRegistry => ({
    containerRegistry: globalRegistry.get('containers')
}))
@connect($transform({
    isHidden: $or(
        $get('ui.leftSideBar.isHidden'),
        $get('ui.fullScreen.isFullScreen')
    ),
    isHiddenContentTree: $get('ui.leftSideBar.contentTree.isHidden'),
    siteNode: selectors.CR.Nodes.siteNodeSelector,
    documentNode: selectors.CR.Nodes.documentNodeSelector
}))
export default class LeftSideBar extends PureComponent {
    static propTypes = {
        containerRegistry: PropTypes.object.isRequired,

        isHidden: PropTypes.bool.isRequired,
        isHiddenContentTree: PropTypes.bool.isRequired
    };

    render() {
        const {isHidden, isHiddenContentTree, containerRegistry} = this.props;

        const classNames = mergeClassNames({
            [style.leftSideBar]: true,
            [style['leftSideBar--isHidden']]: isHidden
        });

        const bottomClassNames = mergeClassNames({
            [style.leftSideBar__bottom]: true,
            [style['leftSideBar__bottom--isCollapsed']]: isHiddenContentTree
        });

        const LeftSideBarTop = containerRegistry.getChildren('LeftSideBar/Top');
        const LeftSideBarBottom = containerRegistry.getChildren('LeftSideBar/Bottom');

        const ContentTreeToolbar = containerRegistry.get('LeftSideBar/ContentTreeToolbar');

        return (
            <SideBar
                position="left"
                className={classNames}
                aria-hidden={isHidden ? 'true' : 'false'}
                >
                <div className={style.leftSideBar__top}>
                    {!isHidden && LeftSideBarTop.map((Item, key) => <Item key={key} isExpanded={!isHiddenContentTree}/>)}
                </div>

                {/* Disable top border to get only a 1px combined border size */}
                <hr style={{borderTop: 'none'}}/>

                <div className={bottomClassNames}>
                    <ContentTreeToolbar/>
                    {!isHidden && !isHiddenContentTree && LeftSideBarBottom.map((Item, key) => <Item key={key}/>)}
                </div>
            </SideBar>
        );
    }
}
