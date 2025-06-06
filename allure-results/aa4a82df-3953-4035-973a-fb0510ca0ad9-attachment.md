# Test info

- Name: [@smoke] Add items to cart
- Location: C:\Users\joeye\OneDrive\Documents\PlaywrightAutomation\tests\ClientApp.spec.js:7:6

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 3
    at C:\Users\joeye\OneDrive\Documents\PlaywrightAutomation\tests\ClientApp.spec.js:36:59
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
      - button " Cart 3"
    - listitem:
      - button "Sign Out"
- paragraph: Home | Search
- heading "Filters" [level=4]
- textbox "search"
- heading "Price Range" [level=6]
- textbox "Min Price"
- textbox "Max Price"
- heading "Categories" [level=6]
- text: 
- checkbox
- text: fashion
- checkbox
- text: electronics
- checkbox
- text: household
- heading "Sub Categories" [level=6]
- text: 
- checkbox
- text: t-shirts
- checkbox
- text: shirts
- checkbox
- text: shoes
- checkbox
- text: mobiles
- checkbox
- text: laptops
- heading "Search For" [level=6]
- text: 
- checkbox
- text: men
- checkbox
- text: women Showing 3 results | User can only see maximum 9 products on a page
- img
- heading "ZARA COAT 3" [level=5]
- text: $ 31500
- button "View"
- button " Add To Cart"
- img
- heading "ADIDAS ORIGINAL" [level=5]
- text: $ 31500
- button "View"
- button " Add To Cart"
- img
- heading "IPHONE 13 PRO" [level=5]
- text: $ 231500
- button "View"
- button " Add To Cart"
- list "Pagination":
  - listitem: « Previous page
  - listitem: You're on page 1
  - listitem: Next page »
- text: Design and Developed By - Kunal Sharma
```

# Test source

```ts
   1 | const { test, expect } = require('@playwright/test');
   2 | const POManager = require('../page_objects/POManager');
   3 |
   4 |
   5 | test.use({ storageState: './logged-in-state.json' });//reuse the logged-in session
   6 |
   7 | test('[@smoke] Add items to cart', async ({ page }) => {
   8 |     //Go to url and wait to load
   9 |     const poManager = new POManager(page);
   10 |     const dashboardPage = poManager.getDashboardPage();
   11 |     const cartPage = poManager.getCartPage();
   12 |    
   13 |     // Go to cart page and ensure basket is empty
   14 |     await dashboardPage.goto();
   15 |     await dashboardPage.navBar.navigateToCart(); // Navigate to the cart page
   16 |     await cartPage.isCartPage(); // Ensure we are on the cart page
   17 |     await sleep(1000); // Wait for the cart page to load
   18 |     const count2 = await cartPage.navBar.getCartCount();
   19 |     if (await count2 > 0) {
   20 |         // console.log("Cart is not empty, emptying it now...");
   21 |         await cartPage.EmptyCart(); // Empty the cart if there are items
   22 |     }
   23 |
   24 |     // go to dashboard page to add items to cart
   25 |     // items can be replaced with variable then split out into a data file
   26 |     await sleep(200);
   27 |     await dashboardPage.goto(); // Navigate to the dashboard page
   28 |
   29 |     const dataset = JSON.parse(JSON.stringify(require("./setup/productTestData.json")))
   30 |     let count = 0;
   31 |     for (const product of dataset.products){
   32 |         await dashboardPage.addToCart(product.name); // Add each item to the cart
   33 |         await count++;
   34 |         await sleep(500); // Wait for the item to be added to the cart
   35 |         console.log(`Added ${product.name} to cart. Current count: ${count}`);
>  36 |         expect(await dashboardPage.navBar.getCartCount()).toBe(count);
      |                                                           ^ Error: expect(received).toBe(expected) // Object.is equality
   37 |     }
   38 |
   39 |     
   40 |     // await dashboardPage.addToCart("ZARA COAT 3");
   41 |     // await sleep(500);
   42 |     // expect(await dashboardPage.navBar.getCartCount()).toBe(1);
   43 |     // await dashboardPage.addToCart("ADIDAS ORIGINAL");
   44 |     // await sleep(500);
   45 |     // expect(await dashboardPage.navBar.getCartCount()).toBe(2);
   46 |     // await dashboardPage.addToCart("IPHONE 13 PRO");
   47 |     // await sleep(500);
   48 |     // expect(await dashboardPage.navBar.getCartCount()).toBe(3);
   49 |
   50 | });
   51 |
   52 | //test to check all links in nav bar works
   53 | test('[@smoke] @UnitTest Navigation Links', async ({ page }) => {
   54 |     const poManager = new POManager(page);
   55 |     const dashboardPage = poManager.getDashboardPage();
   56 |     await dashboardPage.goto(); // Navigate directly to the dashboard page
   57 |
   58 |     await dashboardPage.navBar.navigateToOrders(); // Navigate to the orders page
   59 |     const ordersPage = poManager.getOrdersPage();
   60 |     await ordersPage.isOrdersPage();
   61 |     expect(page.url()).toContain('/dashboard/myorders');
   62 |
   63 |     await dashboardPage.navBar.navigateToHome(); // Navigate to the home page
   64 |     await dashboardPage.isDashboardPage();
   65 |     expect(page.url()).toContain('/dashboard/dash');
   66 |
   67 |     const cartPage = poManager.getCartPage();
   68 |     await dashboardPage.navBar.navigateToCart();    // Navigate to the cart page
   69 |     await cartPage.isCartPage();
   70 |     expect(page.url()).toContain('/dashboard/cart');
   71 |
   72 |
   73 |     await cartPage.navBar.signOut();    // Sign out from the application
   74 |     const loginPage = poManager.getLoginPage();
   75 |     // workaround, automation won't redirect to login page after sign out. If logged in, user will be redirected to dashboard page
   76 |     await loginPage.goto();
   77 |     await loginPage.isLoginPage(); 
   78 |     await expect(page.url()).toContain('client/auth/login'); 
   79 | });
   80 |
   81 | // helps test remove items from cart and tidied up after the first test that populates the cart
   82 | test(('[@smoke] remove all items from cart'), async ({ page }) => {
   83 |     const poManager = new POManager(page);
   84 |     const dashboardPage = poManager.getDashboardPage();
   85 |     await dashboardPage.goto(); // Navigate to the dashboard page
   86 |
   87 |     // go to cart page and check number of items in the cart
   88 |     await dashboardPage.navBar.navigateToCart();
   89 |     const cartPage = poManager.getCartPage();
   90 |     await sleep(900);
   91 |     console.log("Check cart items: "+ await cartPage.getCartItemsCount());
   92 |
   93 |     // Remove all items from the cart
   94 |     await cartPage.EmptyCart();
   95 |     await sleep(900);
   96 |     expect(await cartPage.getCartItemsCount()).toBe(0); // Check if the cart is empty
   97 |      console.log("cart is emopty now");
   98 | });
   99 |
  100 | test('[@smoke] Remove item from cart by name', async ({ page }) => {
  101 |     const poManager = new POManager(page);
  102 |     const dashboardPage = poManager.getDashboardPage();
  103 |     await dashboardPage.goto(); // Navigate to the dashboard page
  104 |     const dataset = JSON.parse(JSON.stringify(require("./setup/productTestData.json")))
  105 |     const item1 = dataset.products[0].name; // Get the first item name from the dataset
  106 |
  107 |     await dashboardPage.addToCart(item1);
  108 |     await sleep(500);
  109 |     expect(await dashboardPage.navBar.getCartCount()).toBe(1);
  110 |
  111 |     await dashboardPage.navBar.navigateToCart();
  112 |     const cartPage = poManager.getCartPage();
  113 |     
  114 |     await cartPage.RemoveItemFromCart(item1);
  115 |     expect(await cartPage.cartItems.count()).toBe(0); // Check if the cart is empty
  116 | });
  117 |
  118 | function sleep(ms) {
  119 |     return new Promise(resolve => setTimeout(resolve, ms));
  120 | }
  121 |
  122 |
```