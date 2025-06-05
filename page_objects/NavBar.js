
//gets used by Dashboard, MyOrders, Cart
class NavBar {
  constructor(page) {
    this.page = page;
    const navBarLocator = page.locator('ul').first();
    this.homeLink = navBarLocator.getByRole("button", { name: 'HOME' });
    this.ordersLink = navBarLocator.getByRole('button', { name: 'ORDERS' });
    this.cartLink = navBarLocator.getByRole("button", { name: 'Cart' });
    this.signoutLink = navBarLocator.getByRole("button", { name: 'Sign Out' });
    this.cart = page.locator("[routerlink='/dashboard/cart'] label"); //displays number of items in cart
    this.cartBtn = page.locator("[routerlink='/dashboard/cart']"); //button to go to cart
    // this.signoutLink = navBarLocator.locator('.btn.btn-custom').last();
  }

  async navigateToHome() {
    await this.homeLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToOrders() {
    await this.ordersLink.click();
    await this.page.waitForLoadState('networkidle');
  }
  async navigateToCart() {
    await this.cartLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async signOut() {
    await this.signoutLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async getCartCount() {
    await this.page.waitForLoadState('networkidle');
    const cartText = await this.cart.textContent();
    return cartText ? parseInt(cartText) : 0; // Return 0 if cart is empty
  }
}

module.exports = NavBar;
