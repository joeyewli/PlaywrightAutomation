const {test,expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "anshika@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: "state.json"});
    webContext = await browser.newContext({storageState: 'state.json'});
})

test('@Web Client App login', async () => {
    //js file- Login js, DashboardPage
    
    const productName = 'zara coat 3';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    // await page.goto("https://rahulshettyacademy.com/client");
    // await page.locator("#userEmail").fill(email);
    // await page.locator("#userPassword").type("Iamking@000");
    // await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles); 
  
 })