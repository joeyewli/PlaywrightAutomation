
class CheckoutPage {
    constructor(page) {
        this.page = page;
        const productInfo = page.locator(".form__cc [type='text']")
        this.cardNumberInput = productInfo.nth(0);
        this.cvvCodeInput = productInfo.nth(1);
        this.expiryDateMonthSelector = page.locator(".input.ddl").first();
        this.expiryDateDaySelector = page.locator(".input.ddl").last();
        this.nameOnCardInput = productInfo.nth(2);
        this.applyCouponInput = productInfo.nth(3);
        this.applyCouponBtn = page.locator('button[name="Apply Coupon"]');
        this.emailInput = page.locator(".user__name [type='text']").first();
        this.countryInput = page.locator("[placeholder*='Country']"); //Input field that display the country in dropdown
        this.countryDropdown = page.locator(".ta-results");
        // this.placeOrderButton = page.getByRole('button', { name: 'Place Order' }); // This isn't working
        this.placeOrderButton = page.getByText('Place Order');
    }

    async isCheckoutPage() {
        await this.emailInput.waitFor(); // Wait for the email input to be visible
    }
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }

    async getCountryValue() {
        return await this.countryInput.inputValue(); // Get the current value of the country input
    }

    async selectShippingCountry(inserttext, country) {
        // await this.emailInput.fill(email);
        await this.countryInput.pressSequentially(inserttext);// partial text
        await this.countryDropdown.waitFor(); // Wait for the dropdown to appear
        const optionsCount = await this.countryDropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            if ((await this.countryDropdown.locator("button").nth(i).textContent()).includes(country)) {
                await this.countryDropdown.locator("button").nth(i).click();
                break;
            }
        }
    }
    async fillPaymentInformation(cardNumber, expiryMonth, expiryDay, cvv, nameOnCard) {
        await this.cardNumberInput.fill(cardNumber);
        await this.expiryDateMonthSelector.click(); // Click to open the dropdown
        await this.expiryDateMonthSelector.selectOption(String(expiryMonth).padStart(2, '0'));
        await this.expiryDateDaySelector.click(); // Click to open the dropdown
        await this.expiryDateDaySelector.selectOption(String(expiryDay).padStart(2, '0'));
        if (cvv.type === "number") {
            cvv = this.cvvCodeInput.fill(String(cvv)); // Ensure CVV is a string and padded to 3 digits
        }
        else if (cvv.type === "string") {
            await this.cvvCodeInput.fill(cvv);
        }
        await this.nameOnCardInput.fill(nameOnCard);
    }

    async checkShippingEmail(email) {
        if (email === await this.emailInput.textContent()) { return true; }
        else { return false; }
    }
    async placeOrder() {
        await this.placeOrderButton.click();
    }

    //to test and need to find valid coupon codes
    async applyCoupon(couponCode) {
        await this.applyCouponInput.fill(couponCode);
        await this.applyCouponBtn.click();
    }
}

module.exports = CheckoutPage;