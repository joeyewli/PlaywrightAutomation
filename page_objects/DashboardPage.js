import { expect } from '@playwright/test';
const url = "https://rahulshettyacademy.com/client";
//Actual but auto jumps to this page if login anyways - https://rahulshettyacademy.com/client/dashboard/dash
class DashboardPage {
    constructor(page) {
        this.page = page;
        this.productNames = page.locator(".card-body b");
        this.products = page.locator(".card-body");
        this.cart = page.locator("[routerlink='/dashboard/cart'] label"); //displays number of items in cart
        this.cartBtn = page.locator("[routerlink='/dashboard/cart']"); //button to go to cart
        this.loadingWidget = page.locator("ngx-spinner div").first();
      
    }
    
    async getProductTitles() {
        await this.productLocator.first().waitFor();
        return await this.productLocator.allTextContents();
    }
    
    async goto() {
        await this.page.goto("url");
    }

    async addToCart(productName) {
        const titles = await this.productNames.allTextContents();
        const count = await this.products.count();
         for (let i = 0; i < count; i++) {
            if(await this.products.nth(i).locator('b').textContent() === productName) {
                // await this.products.nth(i).locator("text= Add To Cart").click();
                await this.products.nth(i).getByRole('button', { name: 'Add To Cart' }).click();
                break;            
            }
         }

    }

    async getCartCount() {
        await this.page.waitForLoadState('networkidle');
        await this.loadingWidget.waitFor({ state: 'hidden'});
        const cartText = await this.cart.textContent(); 
        console.log('Cart text: ' + cartText);
        return cartText ? parseInt(cartText) : 0; // Return 0 if cart is empty
    }
    async goToCart() {
        await this.cartBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

}
module.exports = DashboardPage;

