import { expect } from '@playwright/test';
const cartPageUrl = "https://rahulshettyacademy.com/client/dashboard/cart";
const NavBar = require('./NavBar');

class CartPage {
    constructor(page) {
        this.page = page;
        this.navBar = new NavBar(page);
        this.cartItems = page.locator('.cart li');
        this.checkoutButton = page.getbyRole('button', { name: 'Checkout' });
        this.continueShoppingButton = page.getbyRole('button', { name: 'Continue Shopping' }); //redirects to dashboard page
        //subtotal, total

    }


    //to Test
    async RemoveItemFromCart(itemName) {
        const items = await this.cartItems.all();
        for (const item of items) {
            const itemText = await item.textContent();
            if (itemText.includes(itemName)) {
                const removeButton = item.locator('.btn.btn-danger');
                await removeButton.click();
                break;
            }
        }
    }

    //to Test
    async RemoveItemFromCartByIndex(index) {
        // index is 0-based, so 0 is the first item or just add -1
        const items = await this.cartItems.all();
        if (index < 0 || index >= items.length) {
            throw new Error('Index out of bounds');
        }
        const removeButton = items[index].locator('.btn.btn-danger');
        await removeButton.click();
    }

    //to Test
    async EmptyCart() {
        const items = await this.cartItems.all();
        for (const item of items) {
            const removeButton = item.locator('.btn.btn-danger');
            await removeButton.click();
        }
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }
}

module.exports = CartPage;