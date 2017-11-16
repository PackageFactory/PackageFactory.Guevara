import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Badge from './badge.js';

describe('<Badge/>', () => {
    let props;

    beforeEach(() => {
        props = {
            theme: {
                badge: 'badgeClassName'
            },
            label: 'Foo children'
        };
    });

    it('should render correctly.', () => {
        const wrapper = shallow(<Badge {...props}/>);

        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should allow the propagation of "className" with the "className" prop.', () => {
        const wrapper = shallow(<Badge {...props} className="fooClassName"/>);

        expect(wrapper.prop('className')).toContain('fooClassName');
    });

    it('should allow the propagation of additional props to the wrapper.', () => {
        const wrapper = shallow(<Badge {...props} foo="bar"/>);

        expect(wrapper.prop('foo')).toBe('bar');
    });
});
