import React, {PureComponent, PropTypes} from 'react';
import mergeClassNames from 'classnames';
import style from './style.css';

export default class AbstractButton extends PureComponent {
    static propTypes = {
        isEnabled: PropTypes.bool,
        isHighlighted: PropTypes.bool,
        className: PropTypes.string,
        label: PropTypes.string,
        indicator: PropTypes.number,
        children: PropTypes.node.isRequired,
        onClick: PropTypes.func.isRequired
    };

    render() {
        const {
            isEnabled,
            isHighlighted,
            indicator,
            className,
            ...directProps
        } = this.props;
        const btnClassName = mergeClassNames({
            [style.btn]: true,
            [style['btn--disabled']]: !isEnabled,
            [style['btn--notAllowed']]: !isEnabled,
            [style['btn--highlighted']]: isHighlighted,
            [className]: className && className.length
        });
        const attributes = {
            disabled: !isEnabled
        };

        return (
            <button className={btnClassName} {...attributes} {...directProps}>
                {this.props.children} {indicator > 0 ? `(${indicator})` : ''}
            </button>
        );
    }
}
