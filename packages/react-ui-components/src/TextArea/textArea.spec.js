import sinon from 'sinon';
import TextareaAutoresize from 'react-textarea-autosize';
import {createShallowRenderer} from './../_lib/testUtils.js';

import TextArea from './textArea.js';

const defaultProps = {
    theme: {}
};
const shallow = createShallowRenderer(TextArea, defaultProps);

test('should render a "TextareaAutoresize" component.', () => {
    const input = shallow().find(TextareaAutoresize);

    expect(input.length).toBe(1);
});
test('should call the passed "onChange" prop with the value of the input when changing it.', () => {
    const onChange = sinon.spy();
    const input = shallow({onChange}).find(TextareaAutoresize);

    input.simulate('change', {
        target: {
            value: 'my value'
        }
    });

    expect(onChange.callCount).toBe(1);
    expect(onChange.args[0][0]).toBe('my value');
});
