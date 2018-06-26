import {Selector, Role} from 'testcafe';
import {ReactSelector} from 'testcafe-react-selectors';
import checkPropTypes from '../checkPropTypes';

import Page from './pageModel';

const subSection = name => console.log('\x1b[33m%s\x1b[0m', ' - ' + name);

/* global fixture:true */
/* eslint babel/new-cap: 0 */

const page = new Page();

const adminUrl = 'http://127.0.0.1:8081/neos!';

const adminUser = Role(adminUrl, async t => {
    await t
        .typeText('#username', 'admin')
        .typeText('#password', 'password')
        .click('button.neos-login-btn');
}, {preserveUrl: true});

async function waitForIframeLoading(t) {
    await t.expect(ReactSelector('Provider').getReact(({props}) => {
        const reduxState = props.store.getState().toJS();
        return !reduxState.ui.contentCanvas.isLoading;
    })).ok('Loading stopped');
}

async function discardAll(t) {
    await t
        .click(ReactSelector('PublishDropDown ContextDropDownHeader'))
        .click(ReactSelector('PublishDropDown ShallowDropDownContents').find('button').withText('Discard all'));
    const confirmButtonExists = await Selector('#neos-DiscardDialog-Confirm').exists;
    if (confirmButtonExists) {
        await t.click(Selector('#neos-DiscardDialog-Confirm'));
    }
    await waitForIframeLoading(t);
}

async function goToPage(t, pageTitle) {
    await t.click(page.treeNode.withText(pageTitle));
    await waitForIframeLoading(t);
}

fixture`Content Module`
    .beforeEach(async t => {
        await t.useRole(adminUser);
        await discardAll(t);
        await goToPage(t, 'Home');
    })
    .afterEach(() => checkPropTypes());

test('Switching dimensions', async t => {
    subSection('Navigate to some inner page and switch dimension');
    await goToPage(t, 'Multiple columns');
    await t
        .click(ReactSelector('DimensionSwitcher'))
        .click(ReactSelector('DimensionSwitcher SelectBox'))
        .click(ReactSelector('DimensionSwitcher SelectBox').find('li').withText('Latvian'))
        .click('#neos-NodeVariantCreationDialog-CreateEmpty')
        .expect(ReactSelector('Provider').getReact(({props}) => {
            const reduxState = props.store.getState().toJS();
            const isLoading = reduxState.ui.contentCanvas.isLoading;
            const activeDimension = reduxState.cr.contentDimensions.active.language[0];
            return !isLoading && activeDimension === 'lv';
        })).ok('Loading stopped and dimension switched to Latvian')
        .expect(ReactSelector('Provider').getReact(({props}) => {
            const reduxState = props.store.getState().toJS();
            return reduxState.cr.workspaces.personalWorkspace.publishableNodes.length;
        })).gt(0, 'There are some unpublished nodes after adoption')
        .expect(page.treeNode.withText('Navigation elements').exists).notOk('Untranslated node gone from the tree');

    subSection('Switch back to original dimension');
    await t
        .click(ReactSelector('DimensionSwitcher'))
        .click(ReactSelector('DimensionSwitcher SelectBox'))
        .click(ReactSelector('DimensionSwitcher SelectBox').find('li').withText('English (US)'))
        .expect(ReactSelector('Provider').getReact(({props}) => {
            const reduxState = props.store.getState().toJS();
            const isLoading = reduxState.ui.contentCanvas.isLoading;
            const activeDimension = reduxState.cr.contentDimensions.active.language[0];
            return !isLoading && activeDimension === 'en_US';
        })).ok('Loading stopped and dimension back to English')
        .expect(page.treeNode.withText('Navigation elements').exists).ok('Untranslated node back in the tree');
});

test('Discarding: create multiple nodes nested within each other and then discard them', async t => {
    const pageTitleToCreate = 'DiscardTest';
    subSection('Create a document node');
    await t
        .click(Selector('#neos-PageTree-AddNode'))
        .click(ReactSelector('InsertModeSelector').find('#into'))
        .click(ReactSelector('NodeTypeItem'))
        .typeText(Selector('#neos-NodeCreationDialog-Body input'), pageTitleToCreate)
        .click(Selector('#neos-NodeCreationDialog-CreateNew'));
    await waitForIframeLoading(t);

    subSection('Create another node inside it');
    await t
        .click(Selector('#neos-PageTree-AddNode'))
        .click(ReactSelector('InsertModeSelector').find('#into'))
        .click(ReactSelector('NodeTypeItem'))
        .typeText(Selector('#neos-NodeCreationDialog-Body input'), pageTitleToCreate)
        .click(Selector('#neos-NodeCreationDialog-CreateNew'));
    await waitForIframeLoading(t);

    subSection('Discard all nodes and hope to be redirected to root');
    await discardAll(t);
    await t
        .expect(ReactSelector('Provider').getReact(({props}) => {
            const reduxState = props.store.getState().toJS();
            return reduxState.ui.contentCanvas.contextPath;
        })).eql('/sites/neosdemo@user-admin;language=en_US', 'After discarding we are back to the main page');
});

test('Discarding: create a document node and then discard it', async t => {
    const pageTitleToCreate = 'DiscardTest';
    subSection('Create a document node');
    await t
        .click(Selector('#neos-PageTree-AddNode'))
        .click(ReactSelector('NodeTypeItem'))
        .typeText(Selector('#neos-NodeCreationDialog-Body input'), pageTitleToCreate)
        .click(Selector('#neos-NodeCreationDialog-CreateNew'))
        .expect(page.treeNode.withText(pageTitleToCreate).exists).ok('Node with the given title appeared in the tree')
        .expect(ReactSelector('Provider').getReact(({props}) => {
            const reduxState = props.store.getState().toJS();
            return reduxState.cr.workspaces.personalWorkspace.publishableNodes.length;
        })).gt(0, 'There are some unpublished nodes');

    subSection('Discard that node');
    await discardAll(t);
    await t
        .expect(page.treeNode.withText(pageTitleToCreate).exists).notOk('Discarded node gone from the tree')
        .expect(ReactSelector('Provider').getReact(({props}) => {
            const reduxState = props.store.getState().toJS();
            return reduxState.cr.workspaces.personalWorkspace.publishableNodes.length;
        })).eql(0, 'No unpublished nodes left');
    await waitForIframeLoading(t);
    await t
        .switchToIframe('[name="neos-content-main"]')
        .expect(Selector('.neos-message-header').withText('Page Not Found').exists).notOk('Make sure we don\'t end up on 404 page')
        .switchToMainWindow();
});

test('Discarding: delete a document node and then discard deletion', async t => {
    const pageTitleToDelete = 'Try me';

    subSection('Navigate via the page tree');
    await goToPage(t, pageTitleToDelete);
    await t
        .switchToIframe('[name="neos-content-main"]')
        .expect(Selector('.neos-nodetypes-headline h1').withText(pageTitleToDelete).exists).ok('Navigated to the page and see the headline inline')
        .switchToMainWindow();

    subSection('Delete that page');
    await t
        .click(ReactSelector('DeleteSelectedNode'))
        .click(Selector('#neos-DeleteNodeModal-Confirm'))
        .expect(page.treeNode.withText(pageTitleToDelete).exists).notOk('Deleted node gone from the tree')
        .expect(Selector('.neos-message-header').withText('Page Not Found').exists).notOk('Make sure we don\'t end up on 404 page');

    subSection('Discard page deletion');
    await discardAll(t);
    await t
        .expect(page.treeNode.withText(pageTitleToDelete).exists).ok('Deleted node reappeared in the tree');
});

test('Discarding: create a content node and then discard it', async t => {
    const defaultHeadlineTitle = 'Enter headline here';

    subSection('Create a content node');
    await t
        .click(Selector('#neos-ContentTree-ToggleContentTree'))
        .click(page.treeNode.withText('Content Collection (main)'))
        .click(ReactSelector('AddNode').nth(1).find('button'))
        .click(ReactSelector('NodeTypeItem').find('button>span').withText('Headline'));
    await waitForIframeLoading(t);
    await t
        .switchToIframe('[name="neos-content-main"]')
        .expect(Selector('.neos-contentcollection').withText(defaultHeadlineTitle).exists).ok('New headline appeared on the page')
        .switchToMainWindow()
        .expect(page.treeNode.withText(defaultHeadlineTitle).exists).ok('New headline appeared in the tree')
        .expect(ReactSelector('Provider').getReact(({props}) => {
            const reduxState = props.store.getState().toJS();
            return reduxState.cr.workspaces.personalWorkspace.publishableNodes.length;
        })).gt(0, 'There are some unpublished nodes');

    subSection('Discard that node');
    await discardAll(t);
    await t
        .expect(page.treeNode.withText(defaultHeadlineTitle).exists).notOk('Discarded node gone from the tree')
        .expect(ReactSelector('Provider').getReact(({props}) => {
            const reduxState = props.store.getState().toJS();
            return reduxState.cr.workspaces.personalWorkspace.publishableNodes.length;
        })).eql(0, 'No unpublished nodes left');
    await waitForIframeLoading(t);
    await t
        .switchToIframe('[name="neos-content-main"]')
        .expect(Selector('.neos-contentcollection').withText(defaultHeadlineTitle).exists).notOk('New headline gone from the page')
        .switchToMainWindow();
});

test('Discarding: delete a content node and then discard deletion', async t => {
    const headlineToDelete = 'Imagine this...';

    subSection('Delete this headline');
    await t
        .click(Selector('#neos-ContentTree-ToggleContentTree'))
        .click(page.treeNode.withText(headlineToDelete))
        .click(ReactSelector('DeleteSelectedNode').nth(1))
        .click(Selector('#neos-DeleteNodeModal-Confirm'));
    await waitForIframeLoading(t);
    await t
        .expect(page.treeNode.withText(headlineToDelete).exists).notOk('Deleted node gone from the tree')
        .switchToIframe('[name="neos-content-main"]')
        .expect(Selector('.neos-inline-editable').withText(headlineToDelete).exists).notOk('New headline gone from the page')
        .switchToMainWindow();

    subSection('Discard page deletion');
    await discardAll(t);
    await t
        .expect(page.treeNode.withText(headlineToDelete).exists).ok('Deleted node reappeared in the tree');
    await waitForIframeLoading(t);
    await t
        .switchToIframe('[name="neos-content-main"]')
        .expect(Selector('.neos-inline-editable').withText(headlineToDelete).exists).ok('New headline reappeared on the page')
        .switchToMainWindow();
});

test('PageTree search and filter', async t => {
    subSection('Search the page tree');
    const nodeTreeSearchInput = ReactSelector('NodeTreeSearchInput');
    const nodeTreeFilter = ReactSelector('NodeTreeFilter');
    const shortcutFilter = ReactSelector('NodeTreeFilter').find('li').withText('Shortcut');
    await t
        .typeText(nodeTreeSearchInput, 'Download')
        .expect(page.treeNode.withText('Download').count).eql(2, 'Two "Download" nodes should be found, on shortcut and one normal page')
        .expect(page.treeNode.withText('Try me').exists).notOk('Top level "Try me" page should be hidden ');

    subSection('Set the Shortcut filter');
    await t
        .click(nodeTreeFilter)
        .click(shortcutFilter)
        .expect(page.treeNode.withText('Download').count).eql(1, 'Only one "Download" page should be found, of type Shortcut')
        .expect(page.treeNode.withText('Shortcut to child node').exists).notOk('No matching "Shortcut" pages should be hidden')
        .expect(page.treeNode.withText('Try me').exists).notOk('Top level "Try me" page should still be hidden');

    subSection('Clear search');
    const clearSearch = ReactSelector('NodeTreeSearchInput IconButton');
    await t
        .click(clearSearch)
        .expect(page.treeNode.withText('Shortcut to child node').exists).ok('All "Shortcut" pages should be found')
        .expect(page.treeNode.withText('Try me').exists).notOk('Top level "Try me" page should still be hidden');

    subSection('Clear filter');
    const clearFilter = ReactSelector('NodeTreeFilter SelectBox_Header');
    await t
        .click(clearFilter)
        .expect(page.treeNode.withText('Try me').exists).ok('Top level "Try me" page should shown again');
});

test('Can toggle sidebars', async t => {
    subSection('LeftSideBar');
    const leftSideBarToggler = ReactSelector('LeftSideBarToggler Button');
    const leftSideBar = ReactSelector('LeftSideBar');
    await t
    .expect(leftSideBar.getReact(({props}) => props.isHidden)).eql(false)
    .click(leftSideBarToggler)
    .expect(leftSideBar.getReact(({props}) => props.isHidden)).eql(true)
    .click(leftSideBarToggler)
    .expect(leftSideBar.getReact(({props}) => props.isHidden)).eql(false);

    subSection('RightSideBar');
    const rightSideBarToggler = ReactSelector('RightSideBar Button');
    const rightSideBar = ReactSelector('RightSideBar');
    await t
    .expect(rightSideBar.getReact(({props}) => props.isHidden)).eql(false)
    .click(rightSideBarToggler)
    .expect(rightSideBar.getReact(({props}) => props.isHidden)).eql(true)
    .click(rightSideBarToggler)
    .expect(rightSideBar.getReact(({props}) => props.isHidden)).eql(false);
});

test('Can create a new page', async t => {
    const newPageTitle = 'TestPage';
    const SelectNodeTypeModal = ReactSelector('SelectNodeType');
    await t
        .expect(SelectNodeTypeModal.exists).ok()
        .expect(SelectNodeTypeModal.getReact(({props}) => props.isOpen)).eql(false)
        .click(Selector('#neos-PageTree-AddNode'))
        .expect(SelectNodeTypeModal.getReact(({props}) => props.isOpen)).eql(true)
        .click(ReactSelector('NodeTypeItem'))
        .click(Selector('#neos-NodeCreationDialog-Back'))
        .click(ReactSelector('NodeTypeItem'))
        .typeText(Selector('#neos-NodeCreationDialog-Body input'), newPageTitle)
        .click(Selector('#neos-NodeCreationDialog-CreateNew'))
        .expect(ReactSelector('NodeCreationDialog').getReact(({props}) => props.isOpen)).eql(false);
    await waitForIframeLoading(t);
    await t
        .switchToIframe('[name="neos-content-main"]')
        .expect(Selector('li').withText(newPageTitle).exists).ok()
        .switchToMainWindow();
});

test('Can create content node from inside InlineUI', async t => {
    const headlineTitle = 'Helloworld!';
    subSection('Create a headline node');
    await waitForIframeLoading(t);
    await t
        .switchToIframe('[name="neos-content-main"]')
        .click(Selector('.neos-contentcollection'))
        .click(ReactSelector('AddNode Button'))
        .switchToMainWindow()
        .click(Selector('button#into'))
        // TODO: this selector will only work with English translation.
        // Change to `withProps` when implemented: https://github.com/DevExpress/testcafe-react-selectors/issues/14
        .click(ReactSelector('NodeTypeItem').find('button>span').withText('Headline'));

    subSection('Type something inside of it');
    await waitForIframeLoading(t);
    await t
        .switchToIframe('[name="neos-content-main"]')
        .typeText(Selector('.neos-inline-editable h1'), headlineTitle)
        .expect(Selector('.neos-contentcollection').withText(headlineTitle).exists).ok()
        .switchToMainWindow();
});
