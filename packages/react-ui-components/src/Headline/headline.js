import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'classnames';

const types = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6'
];

class Headline extends PureComponent {
    static propTypes = {
        /**
        * The contents to be rendered.
        */
        children: PropTypes.any.isRequired,

        /**
         * The semantic tag type of the headline.
         */
        type: PropTypes.oneOf(types).isRequired,

        /**
         * Optional style identifier, this enables the possibility to diff the
         * semantic value of the UI to the displayed style.
         */
        style: PropTypes.oneOf(types),

        /**
         * An optional `className` to attach to the wrapper.
         */
        className: PropTypes.string,

        /**
        * An optional css theme to be injected.
        */
        theme: PropTypes.shape({
            'heading': PropTypes.string,
            'heading--h1': PropTypes.string
        }).isRequired
    };

    static defaultProps = {
        type: 'h1'
    };

    render() {
        const {
            type,
            className,
            children,
            theme,
            ...rest
        } = this.props;
        const classNames = mergeClassNames({
            [theme.heading]: true,
            [theme['heading--h1']]: true,
            [className]: className && className.length
        });
        let heading;

        switch (type) {
            case 'h1':
                heading = <h1 {...rest} className={classNames}>{children}</h1>;
                break;

            case 'h2':
                heading = <h2 {...rest} className={classNames}>{children}</h2>;
                break;

            case 'h3':
                heading = <h3 {...rest} className={classNames}>{children}</h3>;
                break;

            case 'h4':
                heading = <h4 {...rest} className={classNames}>{children}</h4>;
                break;

            case 'h5':
                heading = <h5 {...rest} className={classNames}>{children}</h5>;
                break;

            default:
                heading = <h6 {...rest} className={classNames}>{children}</h6>;
                break;
        }

        return heading;
    }
}

export default Headline;
