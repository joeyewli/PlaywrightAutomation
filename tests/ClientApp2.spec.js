const { test, expect } = require('@playwright/test');
const POManager = require('../page_objects/POManager');
const { get } = require('http');


test.use({ storageState: './logged-in-state.json' });//reuse the logged-in session

test('Cart APP', async ({ page }) => {
    const poManager = new POManager(page);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.goto();
    await dashboardPage.addToCart("ZARA COAT 3");
    await dashboardPage.navBar.navigateToCart(); // Navigate to the cart pag

    const cartPage = poManager.getCartPage();
    await cartPage.isCartPage(); // Ensure we are on the cart page
    await sleep(900); // Wait for the cart page to load
    expect(await cartPage.getCartItemsCount()).toBe(1);
    expect(await cartPage.itemIsInCart("ZARA COAT 3")).toBeTruthy();
    await cartPage.clickCheckout();
    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.isCheckoutPage();
    
    //Personal Info
    const email = "Joelimemberships@gmail.com";
    const cardNumber = "1234223345678888"; //16 digit
    const expiryMonth = 6; //doubledigit
    const expriryDay = 21; //doubledigit
    const cvv = 123; //3 digit
    const nameOnCard = "John Smith";

    //Check Credit Card
    await checkoutPage.fillPaymentInformation(cardNumber, expiryMonth, expriryDay, cvv, nameOnCard);

    // Voucher stuff
    // await personalInfoTextBox.nth(3).fill("Voucher Test");
    // await page.locator(".form__cc [type='submit']").click();
    // await page.waitForSelector('ngx-spinner div', {state: 'hidden'});


    //check email
    expect (await checkoutPage.checkShippingEmail(email)).toBeTruthy();

    const country = "United Kingdom";
    const countrySubstring = "uni"; // partial text to search in the dropdown

    await checkoutPage.selectShippingCountry(countrySubstring, country);
    expect(await checkoutPage.getCountryValue()).toBe(country);
    await checkoutPage.placeOrder();

    //Check Order Confirmation
    const orderConfirmationPage = poManager.getOrderConfirmationPage();
    await orderConfirmationPage.isOrderConfirmationPage();
    // await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await orderConfirmationPage.getOrderId();
    console.log(orderId);

    //Go to Orders
    const orderPage = poManager.getOrdersPage();
    await orderConfirmationPage.navBar.navigateToOrders(); // Navigate to the orders page
    await orderPage.isOrdersPage(); // Ensure we are on the orders page
    // await page.locator("[routerlink='/dashboard/myorders']").first().click();
    await page.locator(".table").waitFor();//tbody tr
    // const table = await page.locator(".table");
    // const order = table.locator(" .ng-star-inserted"); //th
    // const orderCount = await orderPage.getOrderCount();
    await console.log("OrderID: "+ orderId);
    // await console.log("Ordercount: "+ orderCount);
    orderPage.viewOrderDetailsByOrderID(orderId);
    
    // Check Order Details
    const orderDetailsPage = poManager.getOrderDetailsPage();
    await orderDetailsPage.isOrderDetailsPage();
    expect(orderId.includes(await orderDetailsPage.getOrderId())).toBeTruthy();
    expect(await orderDetailsPage.isBillingAddressCorrect(email)).toBeTruthy();
    expect(await orderDetailsPage.isBillingCountryCorrect(country)).toBeTruthy();


});



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}