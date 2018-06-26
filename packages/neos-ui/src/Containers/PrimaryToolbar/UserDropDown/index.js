import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {$transform, $get} from 'plow-js';
import Icon from '@neos-project/react-ui-components/src/Icon/';
import DropDown from '@neos-project/react-ui-components/src/DropDown/';

import I18n from '@neos-project/neos-ui-i18n';
import {neos} from '@neos-project/neos-ui-decorators';

import style from './style.css';

@connect($transform({
    userName: $get('user.name.fullName')
}))
@neos(globalRegistry => ({
    enableLegacyUiSwitch: $get('enableUiSwitch', globalRegistry.get('frontendConfiguration').get('legacy'))
}))
export default class UserDropDown extends PureComponent {
    static propTypes = {
        userName: PropTypes.string.isRequired,
        neos: PropTypes.object.isRequired,
        enableLegacyUiSwitch: PropTypes.bool
    };

    render() {
        const logoutUri = $get('routes.core.logout', this.props.neos);
        const userSettingsUri = $get('routes.core.modules.userSettings', this.props.neos);
        const csrfToken = document.getElementById('appContainer').dataset.csrfToken;

        const legacyUiSwitch = () => {
            const enableLegacyUiSwitch = this.props.enableLegacyUiSwitch;

            // Don't show legacy ui switch only if
            // explicitly set to false
            if (enableLegacyUiSwitch === false) {
                return null;
            }

            return (
                <li className={style.dropDown__item}>
                    <a title="User Settings" href="/neos/legacy">
                        <Icon icon="far frown" aria-hidden="true" className={style.dropDown__itemIcon}/>
                        <I18n id="userSettings_swtichUi" sourceName="Modules" fallback="Switch to old UI"/>
                    </a>
                </li>
            );
        };

        return (
            <div className={style.wrapper}>
                <DropDown className={style.dropDown}>
                    <DropDown.Header className={style.dropDown__btn}>
                        <Icon className={style.dropDown__btnIcon} icon="user"/>
                        {this.props.userName}
                    </DropDown.Header>
                    <DropDown.Contents className={style.dropDown__contents}>
                        <li className={style.dropDown__item}>
                            <form title="Logout" action={logoutUri} method="post" role="presentation">
                                <input type="hidden" name="__csrfToken" value={csrfToken}/>
                                <button onClick={e => e.stopPropagation()} type="submit" name="" value="logout">
                                    <Icon icon="power-off" aria-hidden="true" className={style.dropDown__itemIcon}/>
                                    <I18n id="logout" sourceName="Main" packageKey="Neos.Neos" fallback="Logout"/>
                                </button>
                            </form>
                        </li>
                        {legacyUiSwitch()}
                        <li className={style.dropDown__item}>
                            <a title="User Settings" href={userSettingsUri}>
                                <Icon icon="wrench" aria-hidden="true" className={style.dropDown__itemIcon}/>
                                <I18n id="userSettings.label" sourceName="Modules" packageKey="Neos.Neos" fallback="User Settings"/>
                            </a>
                        </li>
                    </DropDown.Contents>
                </DropDown>
            </div>
        );
    }
}
