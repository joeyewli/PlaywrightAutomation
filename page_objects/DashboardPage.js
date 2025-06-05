const NavBar = require('./NavBar');

const url = "https://rahulshettyacademy.com/client";
//Actual but auto jumps to this page if login anyways - https://rahulshettyacademy.com/client/dashboard/dash
class DashboardPage {
    constructor(page) {
        this.page = page;
        this.navBar = new NavBar(page);
        this.productNames = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        this.loadingWidget = page.locator("ngx-spinner div").first();
        this.sideBar = page.locator('#sidebar');
    }
    
    async getProductTitles() {
        await this.productLocator.first().waitFor();
        return await this.productLocator.allTextContents();
    }
    
    async goto() {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle'); // Ensure the page is fully loaded
    }

    async isDashboardPage() {
        await this.sideBar.waitFor();
    }

    async addToCart(productName) {
        await this.productNames.first().waitFor(); // Ensure product names are loaded
        // const titles = await this.productNames.allTextContents();
        // const count = await titles.count();
        const count = await this.products.count();
         for (let i = 0; i < count; i++) {
            if(await this.products.nth(i).locator('b').textContent() === productName) {
                await this.products.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
                await this.loadingWidget.waitFor({ state: 'hidden' });
                break;    
            }
         }

    }

   


}
module.exports = DashboardPage;

