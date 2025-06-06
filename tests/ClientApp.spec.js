const { test, expect } = require('@playwright/test');
const POManager = require('../page_objects/POManager');


test.use({ storageState: './logged-in-state.json' });//reuse the logged-in session

test('[@smoke] Add items to cart', async ({ page }) => {
    //Go to url and wait to load
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();

    // Go to cart page and ensure basket is empty
    await dashboardPage.goto();
    await checkCartPageAndEmptyCartThenReturnToDashboard(dashboardPage, cartPage); // Check if cart is empty and return to dashboard

    const dataset = JSON.parse(JSON.stringify(require("./setup/productTestData.json")))
    let count = 0;
    for (const product of dataset.products) {
        await dashboardPage.addToCart(product.name); // Add each item to the cart
        await count++;
        await sleep(500); // Wait for the item to be added to the cart
        console.log(`Added ${product.name} to cart. Current count: ${count}`);
        expect(await dashboardPage.navBar.getCartCount()).toBe(count);
    }


    // await dashboardPage.addToCart("ZARA COAT 3");
    // await sleep(500);
    // expect(await dashboardPage.navBar.getCartCount()).toBe(1);
    // await dashboardPage.addToCart("ADIDAS ORIGINAL");
    // await sleep(500);
    // expect(await dashboardPage.navBar.getCartCount()).toBe(2);
    // await dashboardPage.addToCart("IPHONE 13 PRO");
    // await sleep(500);
    // expect(await dashboardPage.navBar.getCartCount()).toBe(3);

});

//test to check all links in nav bar works
test('[@smoke] @UnitTest Navigation Links', async ({ page }) => {
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.goto(); // Navigate directly to the dashboard page

    await dashboardPage.navBar.navigateToOrders(); // Navigate to the orders page
    const ordersPage = poManager.getOrdersPage();
    await ordersPage.isOrdersPage();
    expect(page.url()).toContain('/dashboard/myorders');

    await dashboardPage.navBar.navigateToHome(); // Navigate to the home page
    await dashboardPage.isDashboardPage();
    expect(page.url()).toContain('/dashboard/dash');

    const cartPage = poManager.getCartPage();
    await dashboardPage.navBar.navigateToCart();    // Navigate to the cart page
    await cartPage.isCartPage();
    expect(page.url()).toContain('/dashboard/cart');


    await cartPage.navBar.signOut();    // Sign out from the application
    const loginPage = poManager.getLoginPage();
    // workaround, automation won't redirect to login page after sign out. If logged in, user will be redirected to dashboard page
    await loginPage.goto();
    await loginPage.isLoginPage();
    await expect(page.url()).toContain('client/auth/login');
});

// helps test remove items from cart and tidied up after the first test that populates the cart
test(('[@smoke] remove all items from cart'), async ({ page }) => {
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.goto(); // Navigate to the dashboard page

    // go to cart page and check number of items in the cart
    await dashboardPage.navBar.navigateToCart();
    const cartPage = poManager.getCartPage();
    await sleep(900);
    console.log("Check cart items: " + await cartPage.getCartItemsCount());

    // Remove all items from the cart
    await cartPage.EmptyCart();
    await sleep(900);
    expect(await cartPage.getCartItemsCount()).toBe(0); // Check if the cart is empty
    console.log("cart is emopty now");
});

test('[@smoke] Remove item from cart by name', async ({ page }) => {
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.goto(); // Navigate to the dashboard page
    const dataset = JSON.parse(JSON.stringify(require("./setup/productTestData.json")))
    const item1 = dataset.products[0].name; // Get the first item name from the dataset

    await dashboardPage.addToCart(item1);
    await sleep(500);
    expect(await dashboardPage.navBar.getCartCount()).toBe(1);

    await dashboardPage.navBar.navigateToCart();
    const cartPage = poManager.getCartPage();

    await cartPage.RemoveItemFromCart(item1);
    expect(await cartPage.cartItems.count()).toBe(0); // Check if the cart is empty
});


test('[@smoke] Cart APP', async ({ page }) => {
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
    const dataset = JSON.parse(JSON.stringify(require("./setup/productTestData.json")))
    const item2 = dataset.products[1].name; // Get the first item name from the dataset

    // Go to cart page and add an item to the cart
    // Item can be replaced with variable then split out into a data file
    await dashboardPage.goto();

    await checkCartPageAndEmptyCartThenReturnToDashboard(dashboardPage,cartPage); // Check if cart is empty and return to dashboard
    await dashboardPage.addToCart(item2);
    await dashboardPage.navBar.navigateToCart(); // Navigate to the cart page
    // Go to cart page and ensure item is in the cart then checkout
    
    await cartPage.isCartPage(); // Ensure we are on the cart page
    await sleep(900); // Wait for the cart page to load
    expect(await cartPage.getCartItemsCount()).toBe(1);
    expect(await cartPage.itemIsInCart(item2)).toBeTruthy();
    await cartPage.clickCheckout();
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.isCheckoutPage();

    //Personal Info - details to save, can be split out into a data file
    const userDataset = JSON.parse(JSON.stringify(require("./setup/userTestData.json")))
    const email = userDataset.testusers[0].email; // Get the email from the dataset
    const cardNumber = userDataset.testusers[0].cardNumber; // Get the card number from the dataset
    const expiryMonth = userDataset.testusers[0].cardExpiry.split('/')[0]; // Get the expiry month from the dataset
    console.log(expiryMonth);
    const expriryDay = userDataset.testusers[0].cardExpiry.split('/')[1]; // Get the expiry day from the dataset
    console.log(expriryDay);
    const cvv = userDataset.testusers[0].cardCVC; // Get the CVV from the dataset
    const nameOnCard = userDataset.testusers[0].nameOnCard; // Get the name on card from the dataset

    //Check Credit Card - fill in details (not mandatory to place order apparently)
    await checkoutPage.fillPaymentInformation(cardNumber, expiryMonth, expriryDay, cvv, nameOnCard);

    // Voucher stuff
    // await personalInfoTextBox.nth(3).fill("Voucher Test");
    // await page.locator(".form__cc [type='submit']").click();
    // await page.waitForSelector('ngx-spinner div', {state: 'hidden'});

    //check email matches the one you signed in with
    expect(await checkoutPage.checkShippingEmail(email)).toBeTruthy();

    //Check Country - enter partial text and select from dropdown then place order
    const country = "United Kingdom";
    const countrySubstring = "uni"; // partial text to search in the dropdown
    await checkoutPage.selectShippingCountry(countrySubstring, country);
    expect(await checkoutPage.getCountryValue()).toBe(country);
    await checkoutPage.placeOrder();

    //Check Order Confirmation - grab order ID
    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    await orderConfirmationPage.isOrderConfirmationPage();
    // await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await orderConfirmationPage.getOrderId();
    // console.log(orderId);

    //Go to Orders and find view order details you just placed
    const orderPage = poManager.getOrdersPage();
    await orderConfirmationPage.navBar.navigateToOrders(); // Navigate to the orders page
    await orderPage.isOrdersPage(); // Ensure we are on the orders page
    await orderPage.viewOrderDetailsByOrderID(orderId);

    // Check Order Details - check if order ID, email and country are correct
    const orderDetailsPage = poManager.getOrderDetailsPage();
    await orderDetailsPage.isOrderDetailsPage();
    expect(orderId.includes(await orderDetailsPage.getOrderId())).toBeTruthy();
    expect(await orderDetailsPage.isBillingAddressCorrect(email)).toBeTruthy();
    expect(await orderDetailsPage.isBillingCountryCorrect(country)).toBeTruthy();
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkCartPageAndEmptyCartThenReturnToDashboard(dashboardPage, cartPage) {
    await sleep(1000); // Wait for the cart page to load
    if (await dashboardPage.navBar.getCartCount() > 0) {
        await dashboardPage.navBar.navigateToCart(); // Navigate to the cart page
        await cartPage.isCartPage(); // Ensure we are on the cart page
        await sleep(1000); // Wait for the cart page to load
        const count2 = await cartPage.navBar.getCartCount();
        if (await count2 > 0) {
            // console.log("Cart is not empty, emptying it now...");
            await cartPage.EmptyCart(); // Empty the cart if there are items
        }

        // go to dashboard page to add items to cart
        // items can be replaced with variable then split out into a data file
        await sleep(200);
        await dashboardPage.goto(); // Navigate to the dashboard page
    }
}