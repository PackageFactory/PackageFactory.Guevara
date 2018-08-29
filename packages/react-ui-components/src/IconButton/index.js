import {themr} from '@friendsofreactjs/react-css-themr';
import identifiers from './../identifiers';
import style from './style.css';
import IconButton from './iconButton.js';

const ThemedIconButton = themr(identifiers.iconButton, style)(IconButton);

//
// Dependency injection
//
import injectProps from './../_lib/injectProps.js';
import Icon from './../Icon/index';
import Button from './../Button/index';

export default injectProps({
    IconComponent: Icon,
    ButtonComponent: Button
})(ThemedIconButton);
