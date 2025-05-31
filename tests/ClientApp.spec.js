const {test,expect} = require('@playwright/test');
const POManager = require('../page_objects/POManager');
const { get } = require('http');

test('Login test', async ({page}) =>
    {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goto();
        await loginPage.login("anshika@gmail.com", "Iamking@000");

        const dashboardPage = poManager.getDashboardPage();
       // await page.locator(".card-body b").first().waitFor();
        await dashboardPage.addToCart("ZARA COAT 3");

        page.pause();
    
    });
test.only('Add items to cart', async ({page}) =>
    {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goto();
        await loginPage.login("anshika@gmail.com", "Iamking@000");

        const dashboardPage = poManager.getDashboardPage();
       // await page.locator(".card-body b").first().waitFor();
        await dashboardPage.addToCart("ZARA COAT 3");
        expect(await dashboardPage.getCartCount()).toBe(1);
        await dashboardPage.addToCart("ADIDAS ORIGINAL");
        expect(await dashboardPage.getCartCount()).toBe(2);
        await dashboardPage.addToCart("IPHONE 13 PRO");
        expect(await dashboardPage.getCartCount()).toBe(3);
    
    });
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

    