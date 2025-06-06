# Test info

- Name: [@smoke] Cart APP
- Location: C:\Users\joeye\OneDrive\Documents\PlaywrightAutomation\tests\ClientApp2.spec.js:8:1

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 2
    at C:\Users\joeye\OneDrive\Documents\PlaywrightAutomation\tests\ClientApp2.spec.js:25:48
```

# Page snapshot

```yaml
- navigation:
  - link "Automation Automation Practice":
    - /url: ""
    - heading "Automation" [level=3]
    - paragraph: Automation Practice
  - link "QA Meetup with Rahul Shetty @Pune - Limited Seats! Book Now!":
    - /url: https://qasummit.org/
  - list:
    - listitem:
      - button " HOME"
    - listitem
    - listitem:
      - button " ORDERS"
    - listitem:
      - button " Cart 2"
    - listitem:
      - button "Sign Out"
- heading "My Cart" [level=1]
- button "Continue Shopping❯"
- list:
  - listitem:
    - paragraph: "#67a8dde5c0d3e6622a297cc8"
    - heading "ZARA COAT 3" [level=3]
    - paragraph: MRP $ 31500
    - paragraph: In Stock
    - paragraph: $ 31500
    - button "Buy Now❯"
    - button "❯"
- list:
  - listitem:
    - paragraph: "#67a8df1ac0d3e6622a297ccb"
    - heading "ADIDAS ORIGINAL" [level=3]
    - paragraph: MRP $ 31500
    - paragraph: In Stock
    - paragraph: $ 31500
    - button "Buy Now❯"
    - button "❯"
- list:
  - listitem: Subtotal $63000
  - listitem: Total $63000
  - listitem:
    - button "Checkout❯"
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 | const POManager = require('../page_objects/POManager');
   3 |
   4 |
   5 |
   6 | test.use({ storageState: './logged-in-state.json' });//reuse the logged-in session
   7 |
   8 | test('[@smoke] Cart APP', async ({ page }) => {
   9 |     const poManager = new POManager(page);
  10 |     const dashboardPage = poManager.getDashboardPage();
  11 |
  12 |     const dataset = JSON.parse(JSON.stringify(require("./setup/productTestData.json")))
  13 |     const item2 = dataset.products[1].name; // Get the first item name from the dataset
  14 |
  15 |     // Go to cart page and add an item to the cart
  16 |     // Item can be replaced with variable then split out into a data file
  17 |     await dashboardPage.goto();
  18 |     await dashboardPage.addToCart(item2);
  19 |     await dashboardPage.navBar.navigateToCart(); // Navigate to the cart pag
  20 |
  21 |     // Go to cart page and ensure item is in the cart then checkout
  22 |     const cartPage = poManager.getCartPage();
  23 |     await cartPage.isCartPage(); // Ensure we are on the cart page
  24 |     await sleep(900); // Wait for the cart page to load
> 25 |     expect(await cartPage.getCartItemsCount()).toBe(1);
     |                                                ^ Error: expect(received).toBe(expected) // Object.is equality
  26 |     expect(await cartPage.itemIsInCart(item2)).toBeTruthy();
  27 |     await cartPage.clickCheckout();
  28 |     const checkoutPage = poManager.getCheckoutPage();
  29 |     await checkoutPage.isCheckoutPage();
  30 |     
  31 |     //Personal Info - details to save, can be split out into a data file
  32 |     const userDataset = JSON.parse(JSON.stringify(require("./setup/userTestData.json")))
  33 |     const email = userDataset.testusers[0].email; // Get the email from the dataset
  34 |     const cardNumber = userDataset.testusers[0].cardNumber; // Get the card number from the dataset
  35 |     const expiryMonth = userDataset.testusers[0].cardExpiry.split('/')[0]; // Get the expiry month from the dataset
  36 |     console.log(expiryMonth);
  37 |     const expriryDay = userDataset.testusers[0].cardExpiry.split('/')[1]; // Get the expiry day from the dataset
  38 |     console.log(expriryDay);
  39 |     const cvv = userDataset.testusers[0].cardCVC; // Get the CVV from the dataset
  40 |     const nameOnCard = userDataset.testusers[0].nameOnCard; // Get the name on card from the dataset
  41 |
  42 |     //Check Credit Card - fill in details (not mandatory to place order apparently)
  43 |     await checkoutPage.fillPaymentInformation(cardNumber, expiryMonth, expriryDay, cvv, nameOnCard);
  44 |
  45 |     // Voucher stuff
  46 |     // await personalInfoTextBox.nth(3).fill("Voucher Test");
  47 |     // await page.locator(".form__cc [type='submit']").click();
  48 |     // await page.waitForSelector('ngx-spinner div', {state: 'hidden'});
  49 |
  50 |     //check email matches the one you signed in with
  51 |     expect (await checkoutPage.checkShippingEmail(email)).toBeTruthy();
  52 |     
  53 |     //Check Country - enter partial text and select from dropdown then place order
  54 |     const country = "United Kingdom";
  55 |     const countrySubstring = "uni"; // partial text to search in the dropdown
  56 |     await checkoutPage.selectShippingCountry(countrySubstring, country);
  57 |     expect(await checkoutPage.getCountryValue()).toBe(country);
  58 |     await checkoutPage.placeOrder();
  59 |
  60 |     //Check Order Confirmation - grab order ID
  61 |     const orderConfirmationPage = poManager.getOrderConfirmationPage();
  62 |     await orderConfirmationPage.isOrderConfirmationPage();
  63 |     // await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  64 |     const orderId = await orderConfirmationPage.getOrderId();
  65 |     // console.log(orderId);
  66 |
  67 |     //Go to Orders and find view order details you just placed
  68 |     const orderPage = poManager.getOrdersPage();
  69 |     await orderConfirmationPage.navBar.navigateToOrders(); // Navigate to the orders page
  70 |     await orderPage.isOrdersPage(); // Ensure we are on the orders page
  71 |     await orderPage.viewOrderDetailsByOrderID(orderId);
  72 |     
  73 |     // Check Order Details - check if order ID, email and country are correct
  74 |     const orderDetailsPage = poManager.getOrderDetailsPage();
  75 |     await orderDetailsPage.isOrderDetailsPage();
  76 |     expect(orderId.includes(await orderDetailsPage.getOrderId())).toBeTruthy();
  77 |     expect(await orderDetailsPage.isBillingAddressCorrect(email)).toBeTruthy();
  78 |     expect(await orderDetailsPage.isBillingCountryCorrect(country)).toBeTruthy();
  79 | });
  80 |
  81 |
  82 | function sleep(ms) {
  83 |     return new Promise(resolve => setTimeout(resolve, ms));
  84 | }
```