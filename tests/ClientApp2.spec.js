const { test, expect } = require('@playwright/test');



//Register account
// add items to shopping cart
// checkout - ensure correct item and description
// ensure email is the one im registed in checkout
//ensure I can select correct country
// apply voucher (has bit of wait time)
// Confirm order - check order code in history matches
test('Second Playwright test', async ({ page }) => {
    //playwright code-
    // const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
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

test('Cart Number updates while adding or removing items', async ({ page }) => {
    const addToCart1 = page.locator(".btn.w-10.rounded").first();
    const addToCart2 = page.locator(".btn.w-10.rounded").nth(1);
    const addToCart3 = page.locator(".btn.w-10.rounded").nth(2);
    const removeFromCart = page.locator(".btn-danger");
    const cart = page.locator("[routerlink='/dashboard/cart'] label");
    const cartBtn = page.locator("[routerlink='/dashboard/cart']");
    //playwright code-
    // const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("Joelimemberships@gmail.com");
    await page.locator("#userPassword").fill("Password123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    //create for loop
    await addToCart1.click();
    await sleep(3000); // need to update method to check testchange/loading widget finishes
    console.log("THIS check: " + await cart.textContent());
    await expect(await cart.textContent()).toBe("1");
    await addToCart2.click();
    await sleep(3000);
    await expect(await cart.textContent()).toBe("2");
    await addToCart3.click();
    await sleep(3000);
    await expect(await cart.textContent()).toBe("3");

    await cartBtn.click();
    await removeFromCart.first().click();
    await sleep(3000);
    await expect(await cart.textContent()).toBe("2");
    await removeFromCart.last().click();
    await sleep(3000);
    await expect(await cart.textContent()).toBe("1");
    await removeFromCart.last().click();
    await sleep(3000);
    await expect(await cart.textContent()).toBe("");
    //remove items

    // await page.locator(".card-body b").first().textContent();

    // await page.locator(".card-body b").first().waitFor();
    // const titles = await page.locator(".card-body b").allTextContents();
    // console.log(titles);


});

test('Cart APp', async ({ page }) => {
    const products = page.locator(".card-body");
    const removeFromCart = page.locator(".btn-danger");
    const cart = page.locator("[routerlink='/dashboard/cart'] label");
    const cartBtn = page.locator("[routerlink='/dashboard/cart']");
    const email = "Joelimemberships@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Password123");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');

    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === "ZARA COAT 3") {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await cartBtn.click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3)").isVisible;
    await expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();


    //Personal Info
    const personalInfoTextBox = page.locator(".form__cc [type='text']");
    const expiryMonth = page.locator(".input.ddl").first();
    const expriyDay = page.locator(".input.ddl").last();

    //Check Credit Card
    await personalInfoTextBox.nth(0).fill("1234223345678888");
    //expiry Dates .input.ddl 
    await expiryMonth.click();
    await expiryMonth.selectOption("06");
    await expriyDay.click();
    await expriyDay.selectOption("21");
    // await expiryMonth.nth(5).click();

    await personalInfoTextBox.nth(1).fill("123");
    await personalInfoTextBox.nth(2).fill("John Smith");


    await personalInfoTextBox.nth(3).fill("Voucher Test");
    await page.locator(".form__cc [type='submit']").click();
    await page.waitForSelector('ngx-spinner div', {state: 'hidden'});



    //Check shipping info
    //check email
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

 

    // check Country
    await page.locator("[placeholder*='Country']").pressSequentially("uni", { delay: 100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    
    for (let i = 0; i < optionsCount; ++i) {
        if (await dropdown.locator("button").nth(i).textContent() === " United Kingdom") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(await page.locator("[placeholder*='Country']").inputValue()).toBe("United Kingdom");

    await page.locator(".action__submit").click();
    await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    //Go to Orders
    await page.locator("[routerlink='/dashboard/myorders']").first().click();
    await page.locator(".table").waitFor();//tbody tr
    const table = await page.locator(".table");
    const order = table.locator(" .ng-star-inserted"); //th 
    const orderCount = await order.count();
    await console.log("OrderID: "+ orderId);
    await console.log("Ordercount: "+ orderCount);
    for (let i = 0; i < orderCount; ++i){
        const thisOrderID = await order.nth(i).locator("[scope='row']").textContent();
        await console.log("Step: "+ i);
        await console.log("thisorderID: "+ thisOrderID);
        if ( await orderId.includes(thisOrderID.trim())){
            await console.log("Stepb: "+ i);
            await order.nth(i).locator(".btn").first().click();
            break;
        }

    }
    await page.locator(".email-title").waitFor();
    await sleep(4000);


});



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}