
class OrderDetailsPage {
    constructor(page) {
        this.page = page;
        this.orderSummaryTitle = page.locator(".email-title");
        this.orderId = page.locator('.col-text');
        this.addresses = page.locator('.address');//contains table with billing and delivery addresses - title, email and country
        this.title = page.locator('.title');//title of product (only 1 product per page)
        this.price = page.locator('.price');//price of product
        this.viewOrdersButton = page.getByRole('button', { name: 'View Orders' });

    }
    async isOrderDetailsPage() {
        await this.orderSummaryTitle.waitFor();
        // expect(this.orderSummaryTitle).toHaveText(/Order Summary/i);
    }

    async getOrderId() {
        await this.orderId.waitFor();
        return await this.orderId.textContent();
    }

    async isBillingAddressCorrect(email) {
        const length = await this.addresses.count();
        for (let i = 0; i < length; i++) {
            const check = (await this.addresses.nth(i).locator(".content-title").textContent()).trim();
            if (check.toLowerCase() === "billing address") {
                const row = await this.addresses.nth(i).locator(".text").count();
                for (let j = 0; j < row; j++) {
                    const text = await this.addresses.nth(i).locator(".text").nth(j).textContent();
                    if (text.toLowerCase().trim() === email.toLowerCase().trim()) {
                        return true; // Address found
                    }
                }
            }
        }
        return false; // Address not found
    }

    // find a way to merge this with the above function as the core logic is the same
    async isBillingCountryCorrect(country) {
        const length = await this.addresses.count();
        for (let i = 0; i < length; i++) {
            const check = (await this.addresses.nth(i).locator(".content-title").textContent()).trim();
            if (check.toLowerCase() === "billing address") {
                const row = await this.addresses.nth(i).locator(".text").count();
                for (let j = 0; j < row; j++) {
                    const text = await this.addresses.nth(i).locator(".text").nth(j).textContent();
                    if (text.includes(country)) {
                        return true; // Address found
                    }
                }
            }
        }
        return false; // Address not found
    }
}

module.exports = OrderDetailsPage;