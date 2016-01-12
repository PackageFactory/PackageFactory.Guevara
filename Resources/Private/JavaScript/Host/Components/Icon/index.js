import React, {PropTypes} from 'react';
import mergeClassNames from 'classnames';
import {service} from 'Shared/';
import style from './style.css';
import iconStyles from './icons.css';
import {validateIconId} from './IconNames.js';
const {logger} = service;

const getIconClassName = id => {
    const {iconName} = validateIconId(id);

    return iconStyles[iconName];
};

const Icon = props => {
    const {size, padded} = props;
    const iconClassName = getIconClassName(props.icon);
    const classNames = mergeClassNames({
        [style.icon]: true,
        [iconClassName]: true,
        [props.className]: props.className && props.className.length,
        [style['icon--big']]: size === 'big',
        [style['icon--small']]: size === 'small',
        [style['icon--tiny']]: size === 'tiny',
        [style['icon--paddedLeft']]: padded === 'left',
        [style['icon--paddedRight']]: padded === 'right'
    });

    return (
        <i className={classNames}></i>
    );
};
Icon.propTypes = {
    // The icon key of Font-Awesome.
    icon(props, propName) {
        const id = props[propName];
        const {isValid, isMigrationNeeded, iconName} = validateIconId(id);

        if (!isValid) {
            if (isMigrationNeeded && iconName) {
                logger.warn(`Font-Awesome has been updated. The icon name "${id}" has been renamed.

Please adjust the icon configurations in your .yaml files to the new icon name "${iconName}".

https://github.com/FortAwesome/Font-Awesome/wiki/Upgrading-from-3.2.1-to-4`);
            } else {
                return new Error(`Icon name "${id}" was not a found in Font-Awesome 4.5.
Please use the icon names from the Font-Awesome website.

http://fortawesome.github.io/Font-Awesome/icons/`);
            }
        }
    },

    // Style related propTypes.
    size: PropTypes.oneOf(['big', 'small', 'tiny']),
    padded: PropTypes.oneOf(['none', 'left', 'right']),
    className: PropTypes.string
};

export default Icon;
