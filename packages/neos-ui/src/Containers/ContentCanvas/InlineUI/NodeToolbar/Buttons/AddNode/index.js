import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import {actions} from '@neos-project/neos-ui-redux-store';
import {$transform} from 'plow-js';
import IconButton from '@neos-project/react-ui-components/lib/IconButton/';

@connect($transform({
}), {
    openAddNodeModal: actions.UI.AddNodeModal.open
})
export default class AddNode extends PureComponent {
    static propTypes = {
        node: PropTypes.object,
        className: PropTypes.string,
        openAddNodeModal: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.handleOpenModalBtnClick = this.handleOpenModalBtnClick.bind(this);
    }

    render() {
        return (
            <span>
                <IconButton
                    className={this.props.className}
                    icon="plus"
                    onClick={this.handleOpenModalBtnClick}
                    />
            </span>
        );
    }

    handleOpenModalBtnClick() {
        const {
            openAddNodeModal,
            node
        } = this.props;

        openAddNodeModal(node.contextPath, 'append');
    }
}
