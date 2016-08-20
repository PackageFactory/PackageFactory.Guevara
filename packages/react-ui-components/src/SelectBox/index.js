import {themr} from 'react-css-themr';
import identifiers from './../identifiers.js';
import style from './style.css';
import SelectBox from './selectBox.js';

const ThemedSelectBox = themr(identifiers.selectBox, style)(SelectBox);

//
// Dependency injection
//
import injectProps from './../_lib/injectProps.js';
import DropDown from './../DropDown/index';
import Icon from './../Icon/index';

export default injectProps({
    DropDownComponent: DropDown,
    IconComponent: Icon
})(ThemedSelectBox);
