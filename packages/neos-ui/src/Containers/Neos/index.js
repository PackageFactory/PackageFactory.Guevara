import {Component, PropTypes, Children} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class Neos extends Component {
    static propTypes = {
        globalRegistry: PropTypes.object.isRequired,
        translations: PropTypes.object.isRequired,
        configuration: PropTypes.object.isRequired,
        children: PropTypes.element.isRequired
    };

    static childContextTypes = {
        translations: PropTypes.object.isRequired,
        globalRegistry: PropTypes.object.isRequired,
        configuration: PropTypes.object.isRequired
    };

    shouldComponentUpdate(...args) {
        //
        // ToDo: Revisit later, shallow compare may not be suitable for these nested objects
        //
        return shallowCompare(this, ...args);
    }

    getChildContext() {
        const {configuration, translations, globalRegistry} = this.props;
        return {configuration, translations, globalRegistry};
    }

    render() {
        return Children.only(this.props.children);
    }
}
