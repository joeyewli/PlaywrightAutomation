const {test,expect} = require('@playwright/test');
const POManager = require('../page_objects/POManager');

test.only('Second Playwright test', async ({page}) =>
    {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goto();
        await loginPage.login("anshika@gmail.com", "Iamking@000");
        
        //playwright code-
        // const context = await browser.newContext();
        //const page = await context.newPage();
        // await page.goto("https://rahulshettyacademy.com/client");
        // await page.locator("#userEmail").fill("anshika@gmail.com");
        // await page.locator("#userPassword").fill("Iamking@000");
        // await page.locator("[value='Login']").click();
        // await page.waitForLoadState('networkidle');
        // await page.locator(".card-body b").first().textContent();

       // await page.locator(".card-body b").first().waitFor();
        const titles = await page.locator(".card-body b").allTextContents();
        console.log(titles);
    
    
    });

     
test('@Web Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
  
 })