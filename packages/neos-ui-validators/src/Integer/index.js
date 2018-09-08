import React from 'react';
import I18n from '@neos-project/neos-ui-i18n';

/**
 * Checks if the given value is a valid Integer number
 */
const Integer = value => {
    const number = parseInt(value, 10);

    if (value !== null && value !== undefined && value.length !== 0 && !Number.isSafeInteger(number)) {
        return <I18n id="content.inspector.validators.integerValidator.aValidIntegerNumberIsExpected"/>;
    }
    return null;
};

export default Integer;
