const NavBar = require('./NavBar');
// const url = "https://rahulshettyacademy.com/client/dashboard/cart"; //cannot enter page directly, must go through dashboard
class CartPage {
    constructor(page) {
        this.page = page;
        this.navBar = new NavBar(page);
        this.cartItems = page.locator('.cart li');
        this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' }); //redirects to dashboard page
        this.cartTitle = page.locator('h1').getByText('My Cart');
        // this.noProductsMessage = page.locator('h1').getByText("No Products in Your Cart !") 
        this.noProductsMessage = page.getByText('No Products', { exact: false });
    }

    // async goto() {
    //     await this.page.goto(url);
    //     await this.page.waitForLoadState('networkidle'); // Ensure the page is fully loaded
    // }

    async isCartPage() {
        await this.cartTitle.waitFor();
        // console.log("this is cart page");
    }

    async itemIsInCart(itemName) {
        const items = await this.cartItems.all();
        for (const item of items) {
            const itemText = await item.textContent();
            if (itemText.includes(itemName)) {
                return true; // Return true if the item is found in the cart
            }
        }
        return false; // Return false if the item is not found in the cart
    }

    async getCartItemsCount() {
        // console.log("WHERES MY PAUSE");
        if (await this.cartItems.count() === 0) {
            // console.log("Cart is empty");
            return 0; // Return 0 if the cart is empty
        }
        else {
            // console.log("Cart is not empty");
            return await this.cartItems.count();
        }
    }


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

    async EmptyCart() {
        const items = await this.cartItems.all();
        // console.log(`Emptying cart with ${items.length} items...`);
        for (const item of items) {
            const removeButton = item.locator('.btn.btn-danger');
            await removeButton.click();
            await this.page.waitForLoadState('networkidle'); // Wait for the cart to update
        }
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    //to Test
    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }
}

module.exports = CartPage;