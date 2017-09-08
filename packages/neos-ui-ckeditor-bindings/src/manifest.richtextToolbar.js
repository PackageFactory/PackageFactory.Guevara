import IconButton from '@neos-project/react-ui-components/src/IconButton/';

import LinkIconButton from './EditorToolbar/LinkIconButton';
import StyleSelect from './EditorToolbar/StyleSelect';
import RichTextToolbarRegistry from './registry/RichTextToolbarRegistry';

//
// Create richtext editing toolbar registry
//
export default (ckEditorRegistry, nodeTypesRegistry) => {
    const richtextToolbar = ckEditorRegistry.add('richtextToolbar', new RichTextToolbarRegistry(`
        Contains the Rich Text Editing Toolbar components.

        The values are objects of the following form:

            {
                formatting: 'h1' // References a key inside "formattingRules"
                component: Button // the React component being used for rendering
                callbackPropName: 'onClick' // Name of the callback prop of the Component which is
                                               fired when the component's value changes.

                // all other properties are directly passed on to the component.
            }

        ## Component wiring

        - Each toolbar component receives all properties except "formatting" and "component" directly as props.
        - Furthermore, the "isActive" property is bound, which is a boolean flag defining whether the text style
          referenced by "formatting" is currently active or not.
        - Furthermore, the callback specified in "callbackPropName" is wired, which toggles the value.

        For advanced use-cases; also the "formattingRule" is bound to the component; containing a formatting-rule identifier (string).
        If you need this, you'll most likely need to listen to selectors.UI.ContentCanvas.formattingUnderCursor and extract
        your relevant information manually.
    `));

    richtextToolbar.setNodeTypesRegistry(nodeTypesRegistry);

    //
    // Configure richtext editing toolbar
    //

    /**
     * Basic Inline Styles (Bold, Italic, ...)
     */

    // Bold
    richtextToolbar.add('strong', {
        formattingRule: 'strong',
        component: IconButton,
        callbackPropName: 'onClick',

        icon: 'bold',
        hoverStyle: 'brand',
        tooltipLabel: 'strong'
    });

    // Italic
    richtextToolbar.add('italic', {
        formattingRule: 'em',
        component: IconButton,
        callbackPropName: 'onClick',

        icon: 'italic',
        hoverStyle: 'brand',
        tooltipLabel: 'italic'
    });

    // Underline
    richtextToolbar.add('underline', {
        formattingRule: 'u',
        component: IconButton,
        callbackPropName: 'onClick',

        icon: 'underline',
        hoverStyle: 'brand',
        tooltipLabel: 'underline'
    });

    // Subscript
    richtextToolbar.add('subscript', {
        formattingRule: 'sub',
        component: IconButton,
        callbackPropName: 'onClick',

        icon: 'subscript',
        hoverStyle: 'brand',
        tooltipLabel: 'subscript'
    });

    // Strike-Through
    richtextToolbar.add('strikethrough', {
        formattingRule: 'del',
        component: IconButton,
        callbackPropName: 'onClick',

        icon: 'strikethrough',
        hoverStyle: 'brand',
        tooltipLabel: 'strikethrough'
    });

    // Strike-Through
    richtextToolbar.add('link', {
        formattingRule: 'a',
        component: LinkIconButton,
        callbackPropName: 'onClick',

        icon: 'link',
        hoverStyle: 'brand',
        tooltipLabel: 'link'
    });

    /**
     * Basic Paragraph Styles (p, h1, h2, pre, ...)
     */
    richtextToolbar.add('style', {
        component: StyleSelect,
        callbackPropName: 'onSelect',
        isVisibleWhen: () => true
    });

    // p tag
    richtextToolbar.add('style/p', {
        formattingRule: 'p',
        label: 'Paragraph'
    });

    // h1
    richtextToolbar.add('style/h1', {
        formattingRule: 'h1',
        label: 'Headline 1'
    });

    // h2
    richtextToolbar.add('style/h2', {
        formattingRule: 'h2',
        label: 'Headline 2'
    });

    // h3
    richtextToolbar.add('style/h3', {
        formattingRule: 'h3',
        label: 'Headline 3'
    });

    // h4
    richtextToolbar.add('style/h4', {
        formattingRule: 'h4',
        label: 'Headline 4'
    });

    // h5
    richtextToolbar.add('style/h5', {
        formattingRule: 'h5',
        label: 'Headline 5'
    });

    // h6
    richtextToolbar.add('style/h6', {
        formattingRule: 'h6',
        label: 'Headline 6'
    });

    // pre
    richtextToolbar.add('style/pre', {
        formattingRule: 'pre',
        label: 'Preformatted'
    });

    /**
     * Sorted and Unsorted Lists
     */

    // ordered list
    richtextToolbar.add('orderedList', {
        formattingRule: 'ol',
        component: IconButton,
        callbackPropName: 'onClick',

        icon: 'list-ol',
        hoverStyle: 'brand',
        tooltipLabel: 'Insert Ordered List'
    });

    // unordered list
    richtextToolbar.add('unorderedList', {
        formattingRule: 'ul',
        component: IconButton,
        callbackPropName: 'onClick',

        icon: 'list-ul',
        hoverStyle: 'brand',
        tooltipLabel: 'Insert Unordered List'
    });

    // Indent
    richtextToolbar.add('indent', {
        formattingRule: 'indent',
        component: IconButton,
        callbackPropName: 'onClick',
        tooltipLabel: 'indent',
        icon: 'indent',
        hoverStyle: 'brand',
        isVisibleWhen: (enabledFormattingRuleIds, formattingUnderCursor) => {
            return (enabledFormattingRuleIds.indexOf('ul') !== -1 || enabledFormattingRuleIds.indexOf('ol') !== -1) &&
                formattingUnderCursor.indent !== richtextToolbar.TRISTATE_DISABLED;
        }
    });

    // Outdent
    richtextToolbar.add('outdent', {
        formattingRule: 'outdent',
        component: IconButton,
        callbackPropName: 'onClick',
        tooltipLabel: 'outdent',
        icon: 'outdent',
        hoverStyle: 'brand',
        isVisibleWhen: (enabledFormattingRuleIds, formattingUnderCursor) => {
            return (enabledFormattingRuleIds.indexOf('ul') !== -1 || enabledFormattingRuleIds.indexOf('ol') !== -1) &&
                formattingUnderCursor.outdent !== richtextToolbar.TRISTATE_DISABLED;
        }
    });

    /**
     * Tables
     */
    richtextToolbar.add('table', {
        formattingRule: 'table',
        component: IconButton,
        callbackPropName: 'onClick',
        tooltipLabel: 'table',
        icon: 'table',
        hoverStyle: 'brand'
    });

    /**
     * Remove formatting
     */
    richtextToolbar.add('removeFormat', {
        formattingRule: 'removeFormat',
        component: IconButton,
        callbackPropName: 'onClick',
        tooltipLabel: 'Keep / Discard formatting',
        icon: 'clipboard',
        hoverStyle: 'brand'
    });

    return richtextToolbar;
};
