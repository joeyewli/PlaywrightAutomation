const { test, expect } = require('@playwright/test');

test('Incorrect Password', async ({ browser }) => {
    //playwright code-
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator('input#username').fill("UserJoe")
    await page.locator('input#password').fill("learning")
    await page.locator('#signInBtn').click();
    //wait for pop up
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");

    //screenshot
    // await test.info().attach('screenshot', {
    //     body: await page.screenshot(),
    //     contentType: 'image/png',
    // });
});

test('Correct Sign in', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('input#username');
    const password = page.locator('input#password')
    const signInBtn = page.locator('#signInBtn');
    const errorBox = page.locator("[style*='block']");
    const cardTitles = page.locator(".card-body a");
    //const firstItem = page.locator(".card-body a").nth(0);
    //playwright code-

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshettyacademy")
    await password.fill("learning")
    await signInBtn.click();
    //wait for pop up
    //console.log(await errorBox.textContent());
    console.log(await cardTitles.first().textContent());
    const allTitles = await cardTitles.allTextContents();
    await console.log(allTitles);



    //screenshot
    // await test.info().attach('screenshot', {
    //     body: await page.screenshot(),
    //     contentType: 'image/png',
    // });
});

test('Second Playwright test', async ({ page }) => {
    //playwright code-
    // const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");


});

test('UI Controls', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('input#username');
    const password = page.locator('input#password');
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked);
    await expect(await page.locator(".radiotextsty").last()).toBeChecked();
  
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    
    //await page.selectOption('#dropdown-id', 'opt3');
    // await page.pause();

    console.log(await dropdown.inputValue());
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();

});

test('@Child windows hadl', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),//listen for any new page pending,rejected,fulfilled
            documentLink.click(),

        ])//new page is opened

    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());

    });