import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'classnames';
import TextareaAutoresize from 'react-textarea-autosize';
import enhanceWithClickOutside from 'react-click-outside';

class TextArea extends PureComponent {
    state = {
        isFocused: false
    };

    static propTypes = {
        /**
         * An optional className to render on the textarea node.
         */
        className: PropTypes.string,

        /**
         * An optional HTML5 placeholder.
         */
        placeholder: PropTypes.string,

        /**
         * The handler which will be called once the user changes the value of the input.
         */
        onChange: PropTypes.func,

        /**
         * This prop controls if the CheckBox is disabled or not.
         */
        disabled: PropTypes.bool,

        /**
         * An optional css theme to be injected.
         */
        theme: PropTypes.shape({
            textArea: PropTypes.string,
            'textArea--invalid': PropTypes.string
        }).isRequired,

        /**
         * Optional number to set the minRows of the TextArea if not expanded
         */
        minRows: PropTypes.number,

        /**
         * Optional number to set the expandedRows of the TextArea if expanded
         */
        expandedRows: PropTypes.number
    };

    static defaultProps = {
        minRows: 2,
        expandedRows: 6
    };

    handleValueChange = e => {
        const value = e.target.value;
        const {onChange} = this.props;

        if (onChange) {
            onChange(value);
        }
    }

    handleOnClick = () => {
        this.setState({
            isFocused: true
        });
    }

    handleClickOutside = () => {
        this.setState({
            isFocused: false
        });
    }

    render() {
        const {
            placeholder,
            className,
            validationErrors,
            theme,
            highlight,
            disabled,
            minRows,
            expandedRows,
            ...rest
        } = this.props;
        const classNames = mergeClassNames({
            [className]: className && className.length,
            [theme.textArea]: true,
            [theme['textArea--disabled']]: disabled
        });

        return (
            <div>
                <TextareaAutoresize
                    {...rest}
                    className={classNames}
                    role="textbox"
                    aria-multiline="true"
                    aria-disabled={disabled ? 'true' : 'false'}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={this.handleValueChange}
                    onClick={this.handleOnClick}
                    minRows={this.state.isFocused ? expandedRows : minRows}
                    />
            </div>
        );
    }
}

//
// Add the click-outside functionality to the TextArea component.
//
const EnhancedTextArea = enhanceWithClickOutside(TextArea);

export default EnhancedTextArea;
export const undecorated = TextArea;
