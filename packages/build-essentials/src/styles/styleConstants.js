const upperFirst = require('lodash.upperfirst');

// Global CSS variables for Neos.Ui
const config = {
    transition: {
        fast: '.1s',
        default: '.3s',
        slow: '.5s'
    },
    zIndex: {
        secondaryToolbar: ['linkIconButtonFlyout'],
        flashMessageContainer: '2',
        loadingIndicatorContainer: '2',
        secondaryInspector: ['context', 'close'],
        secondaryInspectorElevated: ['context', 'dropdownContents'],
        dialog: ['context'],
        fullScreenClose: ['context'],
        drawer: ['context'],
        bar: ['context'],
        primaryToolbar: ['context'],
        checkboxInput: ['context'],
        dropdownContents: ['context'],
        selectBoxContents: ['context'],
        notInlineEditableOverlay: ['context'],
        calendarFakeInputMirror: ['context'],
        rdtPicker: ['context'],
        sideBar: ['dropTargetBefore', 'dropTargetAfter'],
        wrapperDropdown: ['context'],
        unappliedChangesOverlay: ['context'],
        nodeToolBar: '2147483647'
    }
};

const generateCssVarsObject = (subject = config, predicate = '') => {
    const hasPredicate = predicate && predicate.length;
    let target = {};

    Object.keys(subject).forEach(key => {
        const val = subject[key];
        const camelKey = upperFirst(key);
        const nestedPredicate = hasPredicate ? predicate + camelKey : key;

        if (Array.isArray(val)) {
            val.forEach((item, index) => {
                target[`--${predicate}-${camelKey}-${upperFirst(item)}`] = `${index + 1}`;
            });
        } else if (typeof val === 'object') {
            target = Object.assign({}, target, generateCssVarsObject(val, nestedPredicate));
        } else {
            target[`--${predicate}-${camelKey}`] = val;
        }
    });

    return target;
};

module.exports = {
    config,
    generateCssVarsObject
};
