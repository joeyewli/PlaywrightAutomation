const { test, expect } = require('@playwright/test');
const POManager = require('../page_objects/POManager');
const { get } = require('http');


test.use({ storageState: './logged-in-state.json' });//reuse the logged-in session

test('Cart APP', async ({ page }) => {
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();

    // Go to cart page and add an item to the cart
    // Item can be replaced with variable then split out into a data file
    await dashboardPage.goto();
    await dashboardPage.addToCart("ZARA COAT 3");
    await dashboardPage.navBar.navigateToCart(); // Navigate to the cart pag

    // Go to cart page and ensure item is in the cart then checkout
    const cartPage = poManager.getCartPage();
    await cartPage.isCartPage(); // Ensure we are on the cart page
    await sleep(900); // Wait for the cart page to load
    expect(await cartPage.getCartItemsCount()).toBe(1);
    expect(await cartPage.itemIsInCart("ZARA COAT 3")).toBeTruthy();
    await cartPage.clickCheckout();
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.isCheckoutPage();
    
    //Personal Info - details to save, can be split out into a data file
    const email = "Joelimemberships@gmail.com";
    const cardNumber = "1234223345678888"; //16 digit
    const expiryMonth = 6; //doubledigit
    const expriryDay = 21; //doubledigit
    const cvv = 123; //3 digit
    const nameOnCard = "John Smith";

    //Check Credit Card - fill in details (not mandatory to place order apparently)
    await checkoutPage.fillPaymentInformation(cardNumber, expiryMonth, expriryDay, cvv, nameOnCard);

    // Voucher stuff
    // await personalInfoTextBox.nth(3).fill("Voucher Test");
    // await page.locator(".form__cc [type='submit']").click();
    // await page.waitForSelector('ngx-spinner div', {state: 'hidden'});

    //check email matches the one you signed in with
    expect (await checkoutPage.checkShippingEmail(email)).toBeTruthy();
    
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