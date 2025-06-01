
//gets used by Dashboard, MyOrders, Cart
class NavBar {
  constructor(page) {
    this.page = page;
    // this.homeLink = page.locator("button[routerlink='/dashboard']");
    // this.ordersLink = page.locator("button[routerlink*='myorders']")
    // this.cartLink = page.locator("button[routerlink*='cart']")
    // this.signoutLink = page.getByRole("button", { name: 'Sign Out' });

    this.homeLink = page.getByRole("button", { name: 'HOME' });
    this.ordersLink = page.getByRole('button', { name: 'ORDERS' });
    this.cartLink = page.getByRole("button", { name: 'Cart' });
    this.signoutLink = page.getByRole("button", { name: 'Sign Out' });
  }

  async navigateToHome() {
    await this.homeLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async navigateToOrders() {
    console.log(this.ordersLink)
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

}

module.exports = NavBar;
