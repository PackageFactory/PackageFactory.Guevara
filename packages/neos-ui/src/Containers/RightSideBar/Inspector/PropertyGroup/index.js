import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Maybe} from 'monet';
import {$get} from 'plow-js';
import ToggablePanel from '@neos-project/react-ui-components/src/ToggablePanel/';
import Icon from '@neos-project/react-ui-components/src/Icon/';

import I18n from '@neos-project/neos-ui-i18n';

import InspectorEditorEnvelope from '../InspectorEditorEnvelope/index';
import InspectorViewEnvelope from '../InspectorViewEnvelope/index';
import sidebarStyle from '../../style.css';
import style from './style.css';

export default class PropertyGroup extends PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        icon: PropTypes.string,
        collapsed: PropTypes.bool,
        properties: PropTypes.object,
        views: PropTypes.object,
        renderSecondaryInspector: PropTypes.func.isRequired,

        node: PropTypes.object.isRequired,
        commit: PropTypes.func.isRequired
    };

    static defaultProps = {
        collapsed: false
    };

    render() {
        const {properties, views, label, icon, collapsed, renderSecondaryInspector, node, commit} = this.props;
        const headerTheme = {
            panel__headline: style.propertyGroupLabel // eslint-disable-line camelcase
        };

        const propertyGroup = properties => (
            <ToggablePanel isOpen={!collapsed} className={sidebarStyle.rightSideBar__section}>
                <ToggablePanel.Header theme={headerTheme}>
                    {icon && <Icon icon={icon}/>} <I18n id={label}/>
                </ToggablePanel.Header>
                <ToggablePanel.Contents>
                    {properties.map(property => {
                        const propertyId = $get('id', property);
                        return (
                            <InspectorEditorEnvelope
                                key={$get('contextPath', node) + propertyId}
                                id={propertyId}
                                label={$get('label', property)}
                                editor={$get('editor', property)}
                                options={$get('editorOptions', property) && $get('editorOptions', property).toJS ? $get('editorOptions', property).toJS() : $get('editorOptions', property)}
                                renderSecondaryInspector={renderSecondaryInspector}
                                node={node}
                                commit={commit}
                                />);
                    })}
                    {views.map(view => {
                        const viewId = $get('id', view);
                        return (
                            <InspectorViewEnvelope
                                key={$get('contextPath', node) + viewId}
                                id={viewId}
                                label={$get('label', view)}
                                view={$get('view', view)}
                                options={$get('viewOptions', view) && $get('viewOptions', view).toJS ? $get('viewOptions', view).toJS() : $get('viewOptions', view)}
                                renderSecondaryInspector={renderSecondaryInspector}
                                node={node}
                                commit={commit}
                                />);
                    })}
                </ToggablePanel.Contents>
            </ToggablePanel>
        );
        const fallback = () => (<div>...</div>);

        return Maybe.fromNull(properties).map(propertyGroup).orSome(fallback());
    }
}
