import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import moment from 'moment';
import mergeClassNames from 'classnames';

export class DateInput extends PureComponent {
    state = {
        isOpen: false,
        transientDate: null
    };

    static propTypes = {
        /**
         * The Date instance which represents the selected value.
         */
        value: PropTypes.instanceOf(Date),

        /**
         * An optional placeholder which will be rendered if no date was selected.
         */
        placeholder: PropTypes.string,

        /**
         * An optional id for the input.
         */
        id: PropTypes.string,

        /**
         * The label which will be displayed within the `Select Today` btn.
         */
        todayLabel: PropTypes.string,

        /**
         * The label which will be displayed within the `Select Today` btn.
         */
        applyLabel: PropTypes.string,

        /**
         * The moment format string to use to format the passed value.
         */
        labelFormat: PropTypes.string,

        /**
         * Highlight input
         */
        highlight: PropTypes.bool,

        /**
         * Display only date picker
         */
        dateOnly: PropTypes.bool,

        /**
         * Display only time picker
         */
        timeOnly: PropTypes.bool,

        /**
         * Locale for the date picker (determines time format)
         */
        locale: PropTypes.string,

        /**
         * Static component dependencies which are injected from the outside (index.js)
         */
        TooltipComponent: PropTypes.any.isRequired,

        /**
         * An array of error messages
         */
        validationErrors: PropTypes.array,

        /**
         * Disable the DateInput
         */
        disabled: PropTypes.bool,

        /**
         * The changehandler to call when the date changes.
         */
        onChange: PropTypes.func.isRequired,
        theme: PropTypes.shape({/* eslint-disable quote-props */
            'wrapper': PropTypes.string,
            'calendarInputWrapper': PropTypes.string,
            'calendarIconBtn': PropTypes.string,
            'calendarFakeInputWrapper': PropTypes.string,
            'calendarFakeInputMirror': PropTypes.string,
            'calendarFakeInput': PropTypes.string,
            'closeCalendarIconBtn': PropTypes.string,
            'selectTodayBtn': PropTypes.string
        }).isRequired, /* eslint-enable quote-props */

        //
        // Static component dependencies which are injected from the outside (index.js)
        //
        ButtonComponent: PropTypes.any.isRequired,
        IconComponent: PropTypes.any.isRequired,
        DatePickerComponent: PropTypes.any.isRequired,
        CollapseComponent: PropTypes.any.isRequired
    };

    static defaultProps = {
        labelFormat: 'DD-MM-YYYY hh:mm'
    };

    render() {
        const {
            ButtonComponent,
            IconComponent,
            DatePickerComponent,
            CollapseComponent,
            TooltipComponent,
            placeholder,
            theme,
            value,
            id,
            todayLabel,
            applyLabel,
            labelFormat,
            dateOnly,
            timeOnly,
            highlight,
            locale,
            validationErrors,
            disabled
        } = this.props;
        const selectedDate = value ? moment(value).format(labelFormat) : '';
        const handleClick = () => disabled ? null : this.handleClick;
        const handleFocus = () => disabled ? null : this.handleFocus;
        const handleClearValueClick = () => disabled ? null : this.handleClearValueClick;

        const wrapper = mergeClassNames({
            [theme.wrapper]: true,
            [theme.disabled]: disabled
        });

        const renderedErrors = validationErrors && validationErrors.length > 0 && validationErrors.map((validationError, key) => {
            return <div key={key}>{validationError}</div>;
        });

        const calendarInputWrapper = mergeClassNames({
            [theme.calendarInputWrapper]: true,
            [theme['calendarInputWrapper--highlight']]: highlight,
            [theme['calendarInputWrapper--invalid']]: validationErrors && validationErrors.length > 0
        });

        const calendarFakeInputMirror = mergeClassNames({
            [theme.calendarFakeInputMirror]: true,
            [theme['disabled-cursor']]: disabled
        });

        const calendarIconBtn = mergeClassNames({
            [theme.calendarIconBtn]: true,
            [theme['disabled-cursor']]: disabled
        });

        const closeCalendarIconBtn = mergeClassNames({
            [theme.closeCalendarIconBtn]: true,
            [theme['disabled-cursor']]: disabled
        });

        return (
            <div className={wrapper}>
                <div className={calendarInputWrapper}>
                    <button
                        onClick={handleClick()}
                        className={calendarIconBtn}
                        >
                        <IconComponent icon="far calendar-alt"/>
                    </button>
                    <div className={theme.calendarFakeInputWrapper}>
                        <div
                            role="presentation"
                            onClick={handleClick()}
                            className={calendarFakeInputMirror}
                            />
                        <input
                            id={id}
                            onFocus={handleFocus()}
                            type="datetime"
                            placeholder={placeholder}
                            className={theme.calendarFakeInput}
                            value={selectedDate}
                            readOnly
                            />
                    </div>
                    <button
                        onClick={handleClearValueClick()}
                        className={closeCalendarIconBtn}
                        >
                        <IconComponent icon="times"/>
                    </button>
                </div>
                <CollapseComponent isOpened={this.state.isOpen}>
                    <button
                        className={theme.selectTodayBtn}
                        onClick={this.handleSelectTodayBtnClick}
                        >
                        {todayLabel}
                    </button>
                    <DatePickerComponent
                        open={true}
                        defaultValue={value}
                        dateFormat={!timeOnly}
                        locale={locale}
                        timeFormat={!dateOnly}
                        onChange={this.handleChange}
                        />
                    <ButtonComponent
                        onClick={this.handleApply}
                        className={theme.applyBtn}
                        style="brand"
                        >
                        {applyLabel}
                    </ButtonComponent>
                </CollapseComponent>
                {renderedErrors && <TooltipComponent>{renderedErrors}</TooltipComponent>}
            </div>
        );
    }

    handleChange = momentVal => {
        const date = momentVal.toDate();
        this.setState({
            transientDate: date
        });
    }

    handleApply = () => {
        this.setState({
            isOpen: false
        }, () => {
            this.props.onChange(this.state.transientDate);
        });
    }

    handleClearValueClick = () => {
        this.setState({
            isOpen: false
        }, () => {
            this.props.onChange(null);
        });
    }

    handleSelectTodayBtnClick = () => {
        this.setState({
            isOpen: false
        }, () => {
            this.props.onChange(moment().toDate());
        });
    }

    handleFocus = () => this.open();

    handleClick = () => this.toggle();

    handleClickOutside = () => this.close();

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    open() {
        this.setState({
            isOpen: true
        });
    }

    close() {
        this.setState({
            isOpen: false
        });
    }
}

//
// Add the click-outside functionality to the DateInput component.
//
const EnhancedDateInput = enhanceWithClickOutside(DateInput);

export default EnhancedDateInput;
