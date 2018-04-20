import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {$get, $transform} from 'plow-js';
import SelectBox from '@neos-project/react-ui-components/src/SelectBox/';
// TODO extract to some other location, maybe somewhere in the editors packages
import LinkOption from '@neos-project/neos-ui-ckeditor-bindings/src/EditorToolbar/LinkOption';
import {neos} from '@neos-project/neos-ui-decorators';
import {selectors} from '@neos-project/neos-ui-redux-store';
import {isUri} from '@neos-project/utils-helpers';

@connect($transform({
    contextForNodeLinking: selectors.UI.NodeLinking.contextForNodeLinking
}))
@neos(globalRegistry => {
    return {
        linkLookupDataLoader: globalRegistry.get('dataLoaders').get('LinkLookup'),
        i18nRegistry: globalRegistry.get('i18n')
    };
})
class LinkEditor extends PureComponent {
    static propTypes = {
        identifier: PropTypes.string.isRequired,
        value: PropTypes.string,
        commit: PropTypes.func.isRequired,
        highlight: PropTypes.bool,
        options: PropTypes.shape({
            nodeTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
            placeholder: PropTypes.string,
            disabled: PropTypes.bool
        }),

        contextForNodeLinking: PropTypes.shape({
            toJS: PropTypes.func.isRequired
        }).isRequired,
        i18nRegistry: PropTypes.object.isRequired,

        linkLookupDataLoader: PropTypes.shape({
            resolveValue: PropTypes.func.isRequired,
            search: PropTypes.func.isRequired
        }).isRequired
    };

    state = {
        searchTerm: '',
        isLoading: false,
        searchOptions: [],
        options: []
    };

    getDataLoaderOptions() {
        return {
            nodeTypes: $get('options.nodeTypes', this.props) || ['Neos.Neos:Document'],
            contextForNodeLinking: this.props.contextForNodeLinking.toJS()
        };
    }

    componentDidMount() {
        if (!this.props.value) {
            return;
        }

        if (isUri(this.props.value)) {
            const options = [{
                icon: 'external-link-alt',
                identifier: this.props.value,
                label: this.props.value,
                loaderUri: this.props.value
            }];

            this.setState({
                searchTerm: this.props.value,
                options
            });
        } else {
            this.setState({isLoading: true});
            this.props.linkLookupDataLoader.resolveValue(this.getDataLoaderOptions(), this.props.value)
                .then(options => {
                    this.setState({
                        isLoading: false,
                        options
                    });
                });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.componentDidMount();
        }
    }

    handleSearchTermChange = searchTerm => {
        this.setState({searchTerm});
        if (isUri(searchTerm)) {
            const searchOptions = [{
                icon: 'external-link-alt',
                identifier: searchTerm,
                label: searchTerm,
                loaderUri: searchTerm
            }];

            this.setState({
                isLoading: false,
                searchOptions
            });
        } else if (!searchTerm && isUri(this.props.value)) {
            // The user emptied the URL value, so we need to reset it
            this.props.commit('');
        } else if (searchTerm) {
            this.setState({isLoading: true, searchOptions: []});
            this.props.linkLookupDataLoader.search(this.getDataLoaderOptions(), searchTerm)
            .then(searchOptions => {
                this.setState({
                    isLoading: false,
                    searchOptions
                });
            });
        }
    }

    handleValueChange = value => {
        if (!isUri(value)) {
            const options = this.state.searchOptions.reduce((current, option) =>
                (option.loaderUri === value) ? [Object.assign({}, option)] : current, []);

            this.setState({searchTerm: '', options, searchOptions: []});
        }

        this.props.commit(value);
    }

    render() {
        return (
            <SelectBox
                options={this.props.value ? this.state.options : this.state.searchOptions}
                optionValueField="loaderUri"
                highlight={this.props.highlight}
                value={this.props.value}
                onValueChange={this.handleValueChange}
                placeholder={this.props.i18nRegistry.translate(this.props.options.placeholder)}
                loadingLabel={this.props.i18nRegistry.translate('loading', 'Loading', [], 'Neos.Neos', 'Main')}
                displayLoadingIndicator={this.state.isLoading}
                displaySearchBox={true}
                showDropDownToggle={false}
                allowEmpty={true}
                searchTerm={this.state.searchTerm}
                onSearchTermChange={this.handleSearchTermChange}
                ListPreviewElement={LinkOption}
                noMatchesFoundLabel={this.props.i18nRegistry.translate('Neos.Neos:Main:noMatchesFound')}
                searchBoxLeftToTypeLabel={this.props.i18nRegistry.translate('Neos.Neos:Main:searchBoxLeftToType')}
                disabled={this.props.options.disabled}
                />
        );
    }
}

export default LinkEditor;
