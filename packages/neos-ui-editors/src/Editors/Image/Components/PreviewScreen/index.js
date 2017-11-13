import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Icon from '@neos-project/react-ui-components/src/Icon/';
import mergeClassNames from 'classnames';
import {AssetUpload} from '../../../../Library/index';

import {Thumbnail} from '../../Utils/index';
import style from './style.css';

export default class PreviewScreen extends PureComponent {
    static propTypes = {
        image: PropTypes.object,
        afterUpload: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        highlight: PropTypes.bool
    };

    chooseFromLocalFileSystem() {
        this.assetUpload.chooseFromLocalFileSystem();
    }

    render() {
        const {image, afterUpload, onClick, isLoading, highlight} = this.props;

        const classNames = mergeClassNames({
            [style.thumbnail]: true,
            [style['thumbnail--highlight']]: highlight
        });

        if (isLoading) {
            return (
                <div className={classNames}>
                    <Icon icon="spinner" spin={true} size="big" className={style.thumbnail__loader}/>
                </div>
            );
        }
        const thumbnail = image ? Thumbnail.fromImageData(image, 273, 216) : null;

        return (
            <AssetUpload onAfterUpload={afterUpload} isLoading={isLoading} highlight={highlight} ref={this.setAssetUploadReference}>
                <div
                    className={classNames}
                    onClick={onClick}
                    >
                    <div className={style.cropArea} style={(thumbnail ? thumbnail.styles.cropArea : {})}>
                        <img
                            className={(thumbnail ? style.cropArea__image : style['cropArea__image--placeholder'])}
                            src={thumbnail ? thumbnail.uri : '/_Resources/Static/Packages/Neos.Neos/Images/dummy-image.svg'}
                            style={thumbnail ? thumbnail.styles.thumbnail : {}}
                            role="presentation"
                            />
                    </div>
                </div>
            </AssetUpload>
        );
    }

    setAssetUploadReference = ref => {
        if (ref === null) {
            this.assetUpload = null;
            return;
        }
        this.assetUpload = ref.getWrappedInstance();
    }
}
