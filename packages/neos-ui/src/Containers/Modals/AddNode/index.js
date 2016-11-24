import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux';
import {$transform, $get} from 'plow-js';

import Icon from '@neos-project/react-ui-components/lib/Icon/';
import Button from '@neos-project/react-ui-components/lib/Button/';
import Dialog from '@neos-project/react-ui-components/lib/Dialog/';
import SelectBox from '@neos-project/react-ui-components/lib/SelectBox/';

import {neos} from '@neos-project/neos-ui-decorators';
import {actions, selectors} from '@neos-project/neos-ui-redux-store';
import * as NeosPropTypes from '@neos-project/react-proptypes';

import I18n from '@neos-project/neos-ui-i18n';

import NodeTypeGroupPanel from './nodeTypeGroupPanel';
import EditorEnvelope from '@neos-project/neos-ui-editors/src/EditorEnvelope/index';

//
// Export error messages for testing
//
export const errorMessages = {
    ERROR_INVALID_MODE: 'Provided mode is not within allowed modes list in AddNodeModal.'
};

const calculateActiveMode = (currentMode, allowedNodeTypesByMode) => {
    if (currentMode && allowedNodeTypesByMode[currentMode].length) {
        return currentMode;
    }

    const fallbackOrder = ['insert', 'append', 'prepend'];

    for (let i = 0; i < fallbackOrder.length; i++) {
        if (allowedNodeTypesByMode[fallbackOrder[i]].length) {
            return fallbackOrder[i];
        }
    }

    return '';
};

@connect($transform({
    referenceNode: selectors.UI.AddNodeModal.referenceNodeSelector,
    referenceNodeParent: selectors.UI.AddNodeModal.referenceNodeParentSelector,
    referenceNodeGrandParent: selectors.UI.AddNodeModal.referenceNodeGrandParentSelector,
    getAllowedNodeTypesByModeGenerator: selectors.UI.AddNodeModal.getAllowedNodeTypesByModeSelector
}), {
    handleClose: actions.UI.AddNodeModal.close,
    persistChange: actions.Changes.persistChange
})
@neos(globalRegistry => ({
    nodeTypesRegistry: globalRegistry.get('@neos-project/neos-ui-contentrepository')
}))
export default class AddNodeModal extends PureComponent {
    static propTypes = {
        referenceNode: NeosPropTypes.node,
        referenceNodeParent: NeosPropTypes.node,
        referenceNodeGrandParent: NeosPropTypes.node,
        groupedAllowedNodeTypes: PropTypes.array,
        getAllowedNodeTypesByModeGenerator: PropTypes.func.isRequired,
        nodeTypesRegistry: PropTypes.object.isRequired,

        handleClose: PropTypes.func.isRequired,
        persistChange: PropTypes.func.isRequired
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.referenceNode !== nextProps.referenceNode) {
            this.setState({step: 1});
        }
    }

    constructor(...props) {
        super(...props);

        this.state = {
            mode: 'insert',
            step: 1,
            selectedNodeType: null,
            elementValues: {}
        };

        this.handleSelectNodeType = this.handleSelectNodeType.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleDialogEditorValueChange = this.handleDialogEditorValueChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    render() {
        if (!this.props.referenceNode) {
            return null;
        }

        if (this.state.step === 1) {
            return this.renderStep1();
        } else if (this.state.step === 2) {
            return this.renderStep2();
        }

        return null; // basically never called.
    }

    renderStep1() {
        const {
            nodeTypesRegistry,
            getAllowedNodeTypesByModeGenerator
        } = this.props;

        const allowedNodeTypesByMode = getAllowedNodeTypesByModeGenerator(nodeTypesRegistry);
        const activeMode = calculateActiveMode(this.state.mode, allowedNodeTypesByMode);

        const groupedAllowedNodeTypes = nodeTypesRegistry.getGroupedNodeTypeList(allowedNodeTypesByMode[activeMode]);

        return (
            <Dialog
                actions={[this.renderCancelAction()]}
                title={this.renderInsertModeSelector(activeMode, allowedNodeTypesByMode)}
                onRequestClose={close}
                isOpen
                isWide
                >
                {groupedAllowedNodeTypes.map((group, key) => (
                    <div key={key}>
                        <NodeTypeGroupPanel
                            group={group}
                            onSelect={this.handleSelectNodeType}
                            />
                    </div>
                ))}
            </Dialog>
        );
    }

    renderStep2() {
        const creationDialogElements = this.state.selectedNodeType.ui.creationDialog.elements;

        return (
            <Dialog
                actions={[this.renderBackAction(), this.renderSaveAction()]}
                title={(<span><I18n fallback="Create new" id="createNew"/> <I18n id={this.state.selectedNodeType.ui.label} fallback={this.state.selectedNodeType.ui.label}/></span>)}
                onRequestClose={close}
                isOpen
                isWide
                >
                {Object.keys(creationDialogElements).map(elementName => {
                    const element = this.state.selectedNodeType.ui.creationDialog.elements[elementName];
                    const onCommit = value => this.handleDialogEditorValueChange(elementName, value);
                    return (<EditorEnvelope
                        key={elementName}
                        identifier={elementName}
                        label={$get('ui.label', element)}
                        editor={$get('ui.editor', element)}
                        options={$get('ui.editorOptions', element)}
                        commit={onCommit}
                        />);
                })}
            </Dialog>
        );
    }

    handleDialogEditorValueChange(elementName, value) {
        const newValues = this.state.elementValues;
        newValues[elementName] = value;
        this.setState({elementValues: newValues});
    }

    renderInsertModeSelector(activeMode, allowedNodeTypesByMode) {
        const options = [];

        if (allowedNodeTypesByMode.prepend.length) {
            options.push({
                value: 'prepend',
                label: (<span>
                    <I18n fallback="Create new" id="createNew"/> <I18n fallback="before" id="before"/> <Icon icon="level-up"/>
                </span>)
            });
        }

        if (allowedNodeTypesByMode.append.length) {
            options.push({
                value: 'append',
                label: (<span>
                    <I18n fallback="Create new" id="createNew"/> <I18n fallback="after" id="after"/> <Icon icon="level-down"/>
                </span>)
            });
        }

        if (allowedNodeTypesByMode.insert.length) {
            options.push({
                value: 'insert',
                label: (<span>
                    <I18n fallback="Create new" id="createNew"/> <I18n fallback="into" id="into"/> <Icon icon="long-arrow-right"/>
                </span>)
            });
        }

        return (<SelectBox
            options={options}
            value={activeMode}
            onSelect={this.handleModeChange}
            />);
    }

    renderBackAction() {
        return (
            <Button
                key="back"
                style="lighter"
                hoverStyle="brand"
                onClick={this.handleBack}
                isFocused={true}
                >
                <I18n id="TYPO3.Neos:Main:cancel" fallback="Back"/>
            </Button>
        );
    }

    renderCancelAction() {
        return (
            <Button
                key="cancel"
                style="lighter"
                hoverStyle="brand"
                onClick={this.props.handleClose}
                isFocused={true}
                >
                <I18n id="TYPO3.Neos:Main:cancel" fallback="Cancel"/>
            </Button>
        );
    }

    renderSaveAction() {
        return (
            <Button
                key="save"
                style="lighter"
                hoverStyle="brand"
                onClick={this.handleSave}
                isFocused={true}
                >
                <I18n id="TYPO3.Neos:Main:createNew" fallback="Create"/>
            </Button>
        );
    }

    handleModeChange(mode) {
        this.setState({mode});
    }

    handleSelectNodeType(nodeType) {
        if (nodeType.ui.creationDialog) {
            this.setState({step: 2, selectedNodeType: nodeType, elementValues: {}});
        } else {
            // no required node properties; let's directly create the node!
            this.createNode(nodeType);
        }
    }

    handleSave() {
        this.createNode(this.state.selectedNodeType, this.state.elementValues);
    }

    handleBack() {
        this.setState({step: 1});
    }

    createNode(nodeType, data = {}) {
        const {
            referenceNode,
            persistChange,
            handleClose
        } = this.props;

        let changeType;

        switch (this.state.mode) {
            case 'prepend':
                changeType = 'Neos.Neos.Ui:CreateBefore';
                break;
            case 'append':
                changeType = 'Neos.Neos.Ui:CreateAfter';
                break;
            default:
                changeType = 'Neos.Neos.Ui:Create';
                break;
        }

        const change = {
            type: changeType,
            subject: referenceNode.contextPath,
            payload: {
                nodeType: nodeType.name,
                data
            }
        };
        persistChange(change);
        handleClose();
    }
}
