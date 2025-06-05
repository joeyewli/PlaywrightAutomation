const NavBar = require('./NavBar');

const url = "https://rahulshettyacademy.com/client/dashboard/myorders";

class OrdersPage {
  constructor(page) {
    this.page = page;
    this.navBar = new NavBar(page)
    this.ordersTable = page.locator('table');
    this.orderRows = this.ordersTable.locator('tbody tr');
    this.ordersTitle = page.getByText('Your Orders');
  }

  async goto() {
    await this.page.goto(url);
    await this.page.waitForLoadState('networkidle'); // Ensure the page is fully loaded
  }

  async isOrdersPage() {
    await this.ordersTitle.waitFor();
  }

  async getOrderCount() {
    return await this.orderRows.count();
  }
  //To test
  async getOrderDetails(rowIndex) {
    const row = this.orderRows.nth(rowIndex);
    const orderId = await row.locator('th').textContent();
    const orderName = await row.locator('td')[1].textContent();
    const orderPrice = await row.locator('td')[2].textContent();
    const orderDate = await row.locator('td')[3].textContent();
    return { orderId, orderName, orderPrice, orderDate }; // can make this as object
  }

  async viewOrderDetailsByOrderID(orderId) {
    const rows = await this.orderRows.all();
    for (const row of rows) {
      const id = await row.locator('th').textContent();
      if (orderId.includes(id.trim())) {
        // console.log(`Order ID: ${id}`);
        await row.getByRole('button', { name: 'View' }).click();
        return;
      }
    }
    throw new Error(`Order with ID ${orderId} not found`);
  }
}
module.exports = OrdersPage;