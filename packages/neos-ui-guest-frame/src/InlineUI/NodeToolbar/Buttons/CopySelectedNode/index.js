import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import IconButton from '@neos-project/react-ui-components/src/IconButton/';

import {neos} from '@neos-project/neos-ui-decorators';
import {actions} from '@neos-project/neos-ui-redux-store';

@connect(null, {
    copyNode: actions.CR.Nodes.copy
})
@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
export default class CopySelectedNode extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        contextPath: PropTypes.string,
        destructiveOperationsAreDisabled: PropTypes.bool.isRequired,
        isActive: PropTypes.bool.isRequired,
        copyNode: PropTypes.func.isRequired,
        i18nRegistry: PropTypes.object.isRequired
    };

    handleCopySelectedNodeClick = () => {
        const {contextPath, copyNode} = this.props;

        copyNode(contextPath);
    }

    render() {
        const {destructiveOperationsAreDisabled, className, isActive, i18nRegistry} = this.props;

        return (
            <IconButton
                className={className}
                isDisabled={destructiveOperationsAreDisabled}
                isActive={isActive}
                onClick={this.handleCopySelectedNodeClick}
                icon="copy"
                tooltipLabel={i18nRegistry.translate('copy')}
                hoverStyle="clean"
                />
        );
    }
}
