
import { test, expect } from '@playwright/test';
import POManager from '../../page_objects/POManager';




test.describe('Login Setup', () => {
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage()
        await loginPage.goto();
        // await loginPage.login("anshika@gmail.com", "Iamking@000");
        // await loginPage.login("Joelimemberships@gmail.com", "Password123"); 
        const dataset = JSON.parse(JSON.stringify(require("./userTestData.json")))
        const email = dataset.testusers[0].email;
        const password = dataset.testusers[0].password;
        await loginPage.login(email, password);

        await context.storageState({ path: './logged-in-state.json' }); // Save the state to a file
        // await browser.close();
    });

    test('Generate Login State', async ({ page }) => {
    expect(true).toBeTruthy();// Placeholder test to ensure the test suite runs
});
});



