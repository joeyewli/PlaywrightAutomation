const { test, expect } = require('@playwright/test');
const POManager = require('../page_objects/POManager');


test.use({ storageState: './logged-in-state.json' });//reuse the logged-in session

test('Add items to cart', async ({ page }) => {
    //Go to url and wait to load
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    const cartPage = poManager.getCartPage();
   
    // Go to cart page and ensure basket is empty
    await dashboardPage.goto();
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
    await dashboardPage.addToCart("ZARA COAT 3");
    await sleep(200);
    expect(await dashboardPage.navBar.getCartCount()).toBe(1);
    await dashboardPage.addToCart("ADIDAS ORIGINAL");
    await sleep(200);
    expect(await dashboardPage.navBar.getCartCount()).toBe(2);
    await dashboardPage.addToCart("IPHONE 13 PRO");
    await sleep(200);
    expect(await dashboardPage.navBar.getCartCount()).toBe(3);

});

//test to check all links in nav bar works
test('@UnitTest Navigation Links', async ({ page }) => {
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
test(('remove all items from cart'), async ({ page }) => {
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.goto(); // Navigate to the dashboard page

    // go to cart page and check number of items in the cart
    await dashboardPage.navBar.navigateToCart();
    const cartPage = poManager.getCartPage();
    await sleep(900);
    console.log("Check cart items: "+ await cartPage.getCartItemsCount());

    // Remove all items from the cart
    await cartPage.EmptyCart();
    await sleep(900);
    expect(await cartPage.getCartItemsCount()).toBe(0); // Check if the cart is empty
     console.log("cart is emopty now");
});

test('Remove item from cart by name', async ({ page }) => {
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.goto(); // Navigate to the dashboard page

    await dashboardPage.addToCart("ZARA COAT 3");
    expect(await dashboardPage.navBar.getCartCount()).toBe(1);

    await dashboardPage.navBar.navigateToCart();
    const cartPage = poManager.getCartPage();
    
    await cartPage.RemoveItemFromCart("ZARA COAT 3");
    expect(await cartPage.cartItems.count()).toBe(0); // Check if the cart is empty
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

