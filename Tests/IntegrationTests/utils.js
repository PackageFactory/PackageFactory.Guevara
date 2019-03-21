import {t, Role} from 'testcafe';

export const subSection = name => console.log('\x1b[33m%s\x1b[0m', ' - ' + name);

const adminUrl = 'http://127.0.0.1:8081/neos';
const adminUserName = 'admin';
const adminPassword = 'password';

export const adminUser = Role(adminUrl, async t => {
    await t
        .typeText('#username', adminUserName)
        .typeText('#password', adminPassword)
        .click('button.neos-login-btn');
}, {preserveUrl: true});

export async function checkPropTypes() {
    const {error} = await t.getBrowserConsoleMessages();
    if (error[0]) {
        console.log('These console errors were the cause of the failed test:', error);
    }
    await t.expect(error[0]).notOk();
}
