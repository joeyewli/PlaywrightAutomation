const LoginPage = require('./LoginPage');
const DashboardPage = require('./DashboardPage');
const OrdersPage = require('./OrdersPage');
const CartPage = require('./CartPage');
const CheckoutPage = require('./CheckoutPage');
const OrderConfirmationPage = require('./OrderConfirmationPage');
const OrderDetailsPage = require('./OrderDetailsPage');

class POManager {
    constructor(page) {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.ordersPage = new OrdersPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.OrderConfirmationPage = new OrderConfirmationPage(page);
        this.orderDetailsPage = new OrderDetailsPage(page);
        
        
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

    getCheckoutPage() {
        return this.checkoutPage;
    }   
    
    getOrderConfirmationPage() {
        return this.OrderConfirmationPage;
    }

    getOrderDetailsPage() {
        return this.orderDetailsPage;
    }
}
module.exports = POManager;