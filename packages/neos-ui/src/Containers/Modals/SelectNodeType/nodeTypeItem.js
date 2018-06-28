import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {$transform, $get} from 'plow-js';
import Icon from '@neos-project/react-ui-components/src/Icon/';
import Button from '@neos-project/react-ui-components/src/Button/';

import {actions} from '@neos-project/neos-ui-redux-store';

import I18n from '@neos-project/neos-ui-i18n';

import style from './style.css';

@connect($transform({
    mode: $get('ui.addNodeModal.mode')
}), {
    closeModal: actions.UI.AddNodeModal.close,
    persistChanges: actions.Changes.persistChanges
})
class NodeTypeItem extends PureComponent {
    static propTypes = {
        onSelect: PropTypes.func.isRequired,

        nodeType: PropTypes.shape({
            name: PropTypes.string.isRequired,
            ui: PropTypes.object
        }).isRequired
    };

    render() {
        const {ui} = this.props.nodeType;
        const icon = $get('icon', ui);
        const label = $get('label', ui);
        const helpMessage = $get('help.message', ui);

        return (
            <Button
                hoverStyle="brand"
                style="clean"
                className={style.nodeType}
                onClick={this.handleNodeTypeClick}
                title={helpMessage ? helpMessage : ''}
                >
                <span>
                    {icon && <Icon icon={icon} className={style.nodeType__icon} padded="right"/>}
                    <I18n id={label} fallback={label}/>
                </span>
                {helpMessage ? <Icon icon="question-circle" /> : null}
            </Button>
        );
    }

    handleNodeTypeClick = () => {
        this.props.onSelect(this.props.nodeType.name);
    }
}

export default NodeTypeItem;
