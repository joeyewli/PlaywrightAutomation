const LoginPage = require('./LoginPage');
const dashboardPage = require('./DashboardPage');
const OrdersPage = require('./OrdersPage');
const CartPage = require('./CartPage');

class POManager {
    constructor(page) {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new dashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersPage = new OrdersPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrdersPage() {
        return this.ordersPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }
}
module.exports = POManager;