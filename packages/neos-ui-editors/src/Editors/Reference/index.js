import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import SelectBox from '@neos-project/react-ui-components/src/SelectBox/';
import dataLoader from './referenceDataLoader';
import createNew from './createNew';
import NodeOption from '@neos-project/neos-ui-ckeditor-bindings/src/EditorToolbar/NodeOption';
import {neos} from '@neos-project/neos-ui-decorators';

@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
@createNew()
@dataLoader({isMulti: false})
export default class ReferenceEditor extends PureComponent {
    static propTypes = {
        value: PropTypes.string,
        options: PropTypes.array,
        searchOptions: PropTypes.array,
        highlight: PropTypes.bool,
        placeholder: PropTypes.string,
        displayLoadingIndicator: PropTypes.bool,
        threshold: PropTypes.number,
        onSearchTermChange: PropTypes.func,
        onCreateNew: PropTypes.func,
        commit: PropTypes.func.isRequired,
        i18nRegistry: PropTypes.object.isRequired,
        disabled: PropTypes.bool
    };

    handleValueChange = value => {
        this.props.commit(value);
    }

    render() {
        return (<SelectBox
            optionValueField="identifier"
            displaySearchBox={true}
            ListPreviewElement={NodeOption}
            createNewLabel={this.props.i18nRegistry.translate('Neos.Neos:Main:createNew')}
            noMatchesFoundLabel={this.props.i18nRegistry.translate('Neos.Neos:Main:noMatchesFound')}
            searchBoxLeftToTypeLabel={this.props.i18nRegistry.translate('Neos.Neos:Main:searchBoxLeftToType')}
            placeholder={this.props.i18nRegistry.translate(this.props.placeholder)}
            threshold={this.props.threshold}
            options={this.props.options}
            value={this.props.value}
            highlight={this.props.highlight}
            onValueChange={this.handleValueChange}
            loadingLabel={this.props.i18nRegistry.translate('Neos.Neos:Main:loading')}
            displayLoadingIndicator={this.props.displayLoadingIndicator}
            showDropDownToggle={false}
            allowEmpty={true}
            onSearchTermChange={this.props.onSearchTermChange}
            onCreateNew={this.props.onCreateNew}
            disabled={this.props.disabled}
            />);
    }
}
