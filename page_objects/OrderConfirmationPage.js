const NavBar = require('./NavBar');

// await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
//     const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
//     console.log(orderId);


const title = " Thankyou for the order.";
class OrderConfirmationPage{
     constructor(page) {    
        this.page = page;
        this.navBar = new NavBar(page);
        this.orderCompleteMessage = page.getByText(title);
        this.orderIdText = page.locator(".em-spacer-1 .ng-star-inserted");
        this.clickToDownLoadDetailsBtn = page.getByRole('button', { name: 'Click To Download Order Details in CSV' });
        this.tableOrderInfo = page.locator("table .box.box-ext.order-summary-box")//to be Used in the future
        this.tableContactInfo = page.locator("table .info-cta");//to be Used in the future
}

        async isOrderConfirmationPage() {
                await this.orderCompleteMessage.waitFor();
                console.log("This is the Order Complete Page");
        }
        
        async getOrderId() {
                await this.orderIdText.waitFor();
                return await this.orderIdText.textContent();
        }
}

module.exports = OrderConfirmationPage;