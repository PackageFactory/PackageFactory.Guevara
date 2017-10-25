import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {$get, $set} from 'plow-js';
import {memoize} from 'ramda';

import {neos} from '@neos-project/neos-ui-decorators';
import {actions} from '@neos-project/neos-ui-redux-store';
import validate from '@neos-project/neos-ui-validators/src/index';

import Button from '@neos-project/react-ui-components/src/Button/';
import Dialog from '@neos-project/react-ui-components/src/Dialog/';
import I18n from '@neos-project/neos-ui-i18n';
import EditorEnvelope from '@neos-project/neos-ui-editors/src/EditorEnvelope/index';

import style from './style.css';

@neos(globalRegistry => ({
    validatorRegistry: globalRegistry.get('validators')
}))
@connect(state => {
    const isOpen = $get('ui.nodeCreationDialog.isOpen', state);
    const label = $get('ui.nodeCreationDialog.label', state);
    const configuration = $get('ui.nodeCreationDialog.configuration', state);

    return {isOpen, label, configuration};
}, {
    cancel: actions.UI.NodeCreationDialog.cancel,
    back: actions.UI.NodeCreationDialog.back,
    apply: actions.UI.NodeCreationDialog.apply
})
export default class NodeCreationDialog extends PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        label: PropTypes.string,
        configuration: PropTypes.object,
        validatorRegistry: PropTypes.object.isRequired,
        cancel: PropTypes.func.isRequired,
        back: PropTypes.func.isRequired,
        apply: PropTypes.func.isRequired
    };

    constructor() {
        super();

        this.state = {...this.defaultState};
    }

    defaultState = {
        values: {},
        validationErrors: false,
        isDirty: false
    };

    resetState() {
        this.setState(this.defaultState);
    }

    handleDialogEditorValueChange = memoize(elementName => value => {
        const {validatorRegistry, configuration} = this.props;
        const {values} = this.state;
        const newValues = Object.assign({}, values, {[elementName]: value});

        this.setState({
            values: newValues,
            validationErrors: validate(newValues, configuration.elements, validatorRegistry),
            isDirty: true
        });
    })

    handleCancel = () => {
        const {cancel} = this.props;

        cancel();
        this.resetState();
    }

    handleBack = () => {
        const {back} = this.props;

        back();
        this.resetState();
    }

    handleApply = () => {
        const {apply} = this.props;
        const {values} = this.state;

        apply(values);
        this.resetState();
    }

    handleKeyPress = event => {
        const {validationErrors, isDirty} = this.state;
        if (!validationErrors && isDirty && event.key === 'Enter') {
            this.handleApply();
        }
    }

    renderBackAction() {
        return (
            <Button
                id="neos-nodeCreationDialog-back"
                key="back"
                style="lighter"
                hoverStyle="brand"
                onClick={this.handleBack}
                >
                <I18n id="Neos.Neos:Main:back" fallback="Back"/>
            </Button>
        );
    }

    renderTitle() {
        const {label} = this.props;

        return (
            <span>
                <I18n fallback="Create new" id="createNew"/>&nbsp;
                <I18n id={label} fallback={label}/>
            </span>
        );
    }

    renderSaveAction() {
        const {validationErrors, isDirty} = this.state;

        return (
            <Button
                id="neos-nodeCreationDialog-createNew"
                disabled={Boolean(validationErrors || !isDirty)}
                key="save"
                style="lighter"
                hoverStyle="brand"
                onClick={this.handleApply}
                >
                <I18n id="Neos.Neos:Main:createNew" fallback="Create"/>
            </Button>
        );
    }

    render() {
        const {isOpen, configuration} = this.props;

        if (!isOpen) {
            return null;
        }

        const {validationErrors, isDirty} = this.state;

        return (
            <Dialog
                actions={[this.renderBackAction(), this.renderSaveAction()]}
                title={this.renderTitle()}
                onRequestClose={this.handleCancel}
                isOpen
                style="wide"
                >
                <div id="neos-nodeCreationDialog-body" className={style.body}>
                    {Object.keys(configuration.elements)
                        .filter(elementName => Boolean(configuration.elements[elementName]))
                        .map((elementName, index) => {
                            //
                            // Only display errors after user input (isDirty)
                            //
                            const validationErrorsForElement = isDirty ? $get(elementName, validationErrors) : [];
                            const element = configuration.elements[elementName];
                            const options = $set('autoFocus', index === 0, $get('ui.editorOptions', element) || {});

                            return (
                                <div key={elementName} className={style.editor}>
                                    <EditorEnvelope
                                        identifier={elementName}
                                        label={$get('ui.label', element)}
                                        editor={$get('ui.editor', element)}
                                        options={options}
                                        commit={this.handleDialogEditorValueChange(elementName)}
                                        validationErrors={validationErrorsForElement}
                                        value={this.state.values[elementName] || ''}
                                        onKeyPress={this.handleKeyPress}
                                        onEnterKey={this.handleApply}
                                        />
                                </div>
                            );
                        })
                    }
                </div>
            </Dialog>
        );
    }
}
