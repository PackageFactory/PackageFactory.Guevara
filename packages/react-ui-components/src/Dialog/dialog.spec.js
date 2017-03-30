import sinon from 'sinon';
import {createShallowRenderer, createStubComponent} from './../_lib/testUtils.js';
import Dialog from './dialog.js';
import Portal from 'react-portal';

const IconButtonComponent = createStubComponent();
const defaultProps = {
    isOpen: false,
    theme: {
        'dialog--wide': 'wideClassName'
    },
    children: 'Foo children',
    actions: ['Foo 1', 'Foo 2'],
    onRequestClose: () => null,
    IconButtonComponent
};
const shallow = createShallowRenderer(Dialog, defaultProps);

test('should render a "Portal" as the wrapping Component.', () => {
    const portal = shallow().find(Portal);

    expect(portal.length).toBe(1);
});
test('should pas a falsy "isOpened" tag to the "Portal" component if the "isOpen" prop is falsy.', () => {
    const portal = shallow().find(Portal);

    expect(portal.prop('isOpened')).toBe(false);
});
test('should pas a truthy "isOpened" tag to the "Portal" component if the "isOpen" prop is truthy.', () => {
    const portal = shallow({isOpen: true}).find(Portal);

    expect(portal.prop('isOpened')).toBe(true);
});
test('should render a "section" inside the portal with the attribute role="dialog".', () => {
    const portal = shallow().find(Portal);
    const section = portal.find('section');

    expect(section.length).toBe(1);
    expect(section.html().includes('role="dialog"')).toBeTruthy();
});
test('should render the "className" prop if passed.', () => {
    const portal = shallow({
        className: 'barClassName'
    }).find(Portal);
    const section = portal.find('section');

    expect(section.hasClass('barClassName')).toBeTruthy();
});
test('should render the "dialog--wide" className from the "theme" prop if the "isWide" prop is truthy.', () => {
    const portal = shallow({
        isWide: true
    }).find(Portal);
    const section = portal.find('section');

    expect(section.hasClass('wideClassName')).toBeTruthy();
});
test('should render the actions if passed.', () => {
    const portal = shallow().find(Portal);
    const section = portal.find('section');

    expect(section.html().includes('Foo 1')).toBeTruthy();
    expect(section.html().includes('Foo 2')).toBeTruthy();
});
test('should call the "onRequestClose" prop when clicking on the "IconButtonComponent" component.', () => {
    const onRequestClose = sinon.spy();
    const portal = shallow({onRequestClose}).find(Portal);
    const btn = portal.find(IconButtonComponent);

    btn.simulate('click');

    expect(onRequestClose.calledOnce).toBeTruthy();
});
