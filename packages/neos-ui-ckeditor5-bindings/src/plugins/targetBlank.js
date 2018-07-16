import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import AttributeCommand from '@ckeditor/ckeditor5-basic-styles/src/attributecommand';

const TARGET_BLANK = 'targetBlank';

export default class TargetBlank extends Plugin {
    static get pluginName() {
        return 'TargetBlank';
    }
    init() {
        const editor = this.editor;
        editor.model.schema.extend('$text', {allowAttributes: TARGET_BLANK});
        editor.conversion.attributeToElement({
            model: TARGET_BLANK,
            view: {
                name: 'a',
                attributes: {
                    target: '_blank'
                },
                // the priority has got to be the same as here so the elements would get merged:
                // https://github.com/ckeditor/ckeditor5-link/blob/20e96361014fd13bfb93620f5eb5f528e6b1fe6d/src/utils.js#L33
                priority: 5
            }
        });
        editor.commands.add(TARGET_BLANK, new AttributeCommand(this.editor, TARGET_BLANK));
    }
}
