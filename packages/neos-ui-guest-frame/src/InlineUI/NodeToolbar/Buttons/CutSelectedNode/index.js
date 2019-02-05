import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import IconButton from '@neos-project/react-ui-components/src/IconButton/';

import {actions} from '@neos-project/neos-ui-redux-store';

@connect(null, {
    cutNode: actions.CR.Nodes.cut
})
export default class CutSelectedNode extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        contextPath: PropTypes.string,
        destructiveOperationsAreDisabled: PropTypes.bool.isRequired,
        isActive: PropTypes.bool.isRequired,
        canBeEdited: PropTypes.bool.isRequired,
        cutNode: PropTypes.func.isRequired,
        i18nRegistry: PropTypes.object.isRequired
    };

    handleCutSelectedNodeClick = () => {
        const {contextPath, cutNode} = this.props;

        cutNode(contextPath);
    }

    render() {
        const {
            destructiveOperationsAreDisabled,
            isActive,
            className,
            canBeEdited,
            i18nRegistry
        } = this.props;

        return (
            <IconButton
                id="neos-InlineToolbar-CutSelectedNode"
                className={className}
                isActive={isActive}
                isDisabled={destructiveOperationsAreDisabled || !canBeEdited}
                onClick={this.handleCutSelectedNodeClick}
                icon="cut"
                hoverStyle="clean"
                title={i18nRegistry.translate('cut')}
                />
        );
    }
}
