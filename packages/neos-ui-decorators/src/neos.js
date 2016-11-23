import React, {Component, PropTypes} from 'react';

//
// A higher order component to easily spread global
// configuration
//
export default mapRegistriesToProps => WrappedComponent => {
    return class NeosDecorator extends Component {
        static Original = WrappedComponent;

        static contextTypes = {
            globalRegistry: PropTypes.object.isRequired,
            configuration: PropTypes.object.isRequired,
            translations: PropTypes.object.isRequired
        };

        static displayName = `Neos(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

        render() {
            const {configuration, translations, globalRegistry} = this.context;
            const registriesToPropsMap = mapRegistriesToProps ? mapRegistriesToProps(globalRegistry) : {};

            return (
                <WrappedComponent
                    neos={{configuration, globalRegistry}}
                    translations={translations}
                    {...this.props}
                    {...registriesToPropsMap}
                    />
            );
        }
    };
};
