import React, {Component, PropTypes} from 'react';
import {Maybe} from 'monet';
import Tabs from '@neos-project/react-ui-components/lib/Tabs/';

import PropertyGroup from '../PropertyGroup/index';

import style from './style.css';

export default class TabPanel extends Component {
    static displayName = 'Inspector Tab Panel';
    static propTypes = {
        groups: PropTypes.array,
        renderSecondaryInspector: PropTypes.func.isRequired
    };

    render() {
        const {groups, renderSecondaryInspector} = this.props;
        const tabPanel = groups => (
            <Tabs.Panel theme={{panel: style.inspectorTabPanel}}>
                {
                    groups.filter(g => g.properties).map(group => (
                        <PropertyGroup
                            key={group.id}
                            label={group.label}
                            properties={group.properties}
                            renderSecondaryInspector={renderSecondaryInspector}
                            />
                    ))
                }
            </Tabs.Panel>
        );
        const fallback = () => (<div>...</div>);

        return Maybe.fromNull(groups).map(tabPanel).orSome(fallback());
    }
}
