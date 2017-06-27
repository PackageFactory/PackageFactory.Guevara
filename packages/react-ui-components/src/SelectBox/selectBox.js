import React from 'react';
import PropTypes from 'prop-types';
import isFunction from 'lodash.isfunction';
import debounce from 'lodash.debounce';
import AbstractSelectBox, {propTypes as abstractSelectBoxPropTypes, state as abstractState} from './abstractSelectBox';

export default class SelectBox extends AbstractSelectBox {
    static propTypes = {
        ...abstractSelectBoxPropTypes,

        /**
         * This prop represents the current selected value.
         */
        value: PropTypes.string,

        /**
         *
         */
        clearOnSelect: PropTypes.bool,

        /**
         *
         */
        isSearchable: PropTypes.bool,

        /**
         * An optional css theme to be injected.
         */
        theme: PropTypes.shape({/* eslint-disable quote-props */
            'wrapper': PropTypes.string,
            'selectedOptions': PropTypes.string,
            'selectedOptions__item': PropTypes.string
        }).isRequired, /* eslint-enable quote-props */

        //
        // Static component dependencies which are injected from the outside (index.js)
        // Used in sub-components
        //
        DropDownComponent: PropTypes.any.isRequired,
        IconComponent: PropTypes.any.isRequired,
        IconButtonComponent: PropTypes.any.isRequired,
        InputComponent: PropTypes.any.isRequired,
        SearchableSelectBoxComponent: PropTypes.any.isRequired,
        SimpleSelectBoxComponent: PropTypes.any.isRequired
    };

    state = {
        ...abstractState,
        icon: undefined,
        label: undefined
    };

    constructor(...args) {
        super(...args);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleInputLoadOptions = debounce(this.handleInputLoadOptions.bind(this), 200);
    }

    render() {
        const options = this.getOptions();
        const {theme, SearchableSelectBoxComponent, SimpleSelectBoxComponent, loadOptionsOnInput, isSearchable} = this.props;
        const {isLoadingOptions, icon, label, value} = this.state;

        return (
            <div className={this.props.theme.wrapper}>
                {isSearchable ?
                    <SearchableSelectBoxComponent
                        value={value}
                        options={options}
                        loadOptionsOnInput={loadOptionsOnInput}
                        isLoadingOptions={isLoadingOptions}
                        label={label}
                        icon={icon}
                        theme={theme}
                        onSelect={this.handleSelect}
                        onDelete={this.handleDeleteClick}
                        onInput={this.handleInput}
                        /> :
                    <SimpleSelectBoxComponent
                        options={options}
                        isLoadingOptions={isLoadingOptions}
                        label={label}
                        icon={icon}
                        theme={theme}
                        onSelect={this.handleSelect}
                        />
                }
            </div>
        );
    }

    /**
     * Handles the delete-option-click for searchable selectBox
     */
    handleDeleteClick() {
        this.select('', false);
        this.props.onDelete();
    }

    /**
     * Handles a search request -> load options with search term
     *
     * @param searchValue
     */
    handleInput(searchValue) {
        const options = this.props.options;

        this.setState({
            isLoadingOptions: true
        });

        if (isFunction(options)) {
            this.handleInputLoadOptions.cancel();
            this.handleInputLoadOptions(searchValue);
        }
    }

    handleInputLoadOptions(searchValue) {
        const options = this.props.options;
        this._currentSearchValue = searchValue;
        options({
            searchTerm: searchValue,
            callback: options => {
                if (searchValue === this._currentSearchValue) {
                    this.setState({
                        options,
                        isLoadingOptions: false
                    });
                }
            }
        });
    }

    handleSelect(...args) {
        this.select(...args);
    }

    /**
     * select callback for option selection
     *
     * @param {string} incomingValue
     * @param {boolean} shouldTriggerOnSelect
     */
    select(incomingValueObject, shouldTriggerOnSelect = true) {
        const {placeholder, placeholderIcon} = this.props;

        if (incomingValueObject && !this.props.clearOnSelect) {
            this.setState({
                value: incomingValueObject.value || incomingValueObject,
                icon: incomingValueObject.icon || this.getOptionIconForValue(incomingValueObject) || placeholderIcon,
                label: incomingValueObject.label || this.getOptionLabelForValue(incomingValueObject) || placeholder
            });
        } else {
            this.setState({
                value: undefined,
                icon: placeholderIcon,
                label: placeholder
            });
        }

        if (shouldTriggerOnSelect) {
            this.props.onSelect(incomingValueObject);
        }
    }

}
