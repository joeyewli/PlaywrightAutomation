# Test info

- Name: [@smoke] Remove item from cart by name
- Location: C:\Users\joeye\OneDrive\Documents\PlaywrightAutomation\tests\ClientApp.spec.js:88:1

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://rahulshettyacademy.com/client", waiting until "load"

    at DashboardPage.goto (C:\Users\joeye\OneDrive\Documents\PlaywrightAutomation\page_objects\DashboardPage.js:21:25)
    at C:\Users\joeye\OneDrive\Documents\PlaywrightAutomation\tests\ClientApp.spec.js:91:25
```

# Test source

```ts
   1 | const NavBar = require('./NavBar');
   2 |
   3 | const url = "https://rahulshettyacademy.com/client";
   4 | //Actual but auto jumps to this page if login anyways - https://rahulshettyacademy.com/client/dashboard/dash
   5 | class DashboardPage {
   6 |     constructor(page) {
   7 |         this.page = page;
   8 |         this.navBar = new NavBar(page);
   9 |         this.productNames = page.locator(".card-body b");
  10 |         this.products = page.locator(".card-body");
  11 |         this.loadingWidget = page.locator("ngx-spinner div").first();
  12 |         this.sideBar = page.locator('#sidebar');
  13 |     }
  14 |     
  15 |     async getProductTitles() {
  16 |         await this.productLocator.first().waitFor();
  17 |         return await this.productLocator.allTextContents();
  18 |     }
  19 |     
  20 |     async goto() {
> 21 |         await this.page.goto(url);
     |                         ^ Error: page.goto: Target page, context or browser has been closed
  22 |         await this.page.waitForLoadState('networkidle'); // Ensure the page is fully loaded
  23 |     }
  24 |
  25 |     async isDashboardPage() {
  26 |         await this.sideBar.waitFor();
  27 |     }
  28 |
  29 |     async addToCart(productName) {
  30 |         await this.productNames.first().waitFor(); // Ensure product names are loaded
  31 |         // const titles = await this.productNames.allTextContents();
  32 |         // const count = await titles.count();
  33 |         const count = await this.products.count();
  34 |          for (let i = 0; i < count; i++) {
  35 |             if(await this.products.nth(i).locator('b').textContent() === productName) {
  36 |                 await this.products.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
  37 |                 await this.loadingWidget.waitFor({ state: 'hidden' });
  38 |                 break;    
  39 |             }
  40 |          }
  41 |
  42 |     }
  43 |
  44 |    
  45 |
  46 |
  47 | }
  48 | module.exports = DashboardPage;
  49 |
  50 |
```