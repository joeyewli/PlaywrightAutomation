import { expect } from '@playwright/test';

const url = "https://rahulshettyacademy.com/client";

//forget password?
// Don't have an account? Register here or Register button
// dummy email
// social media links (doesn't work)




class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator("#userEmail");
        this.passwordInput = page.locator("#userPassword");
        this.loginButton = page.locator("[value='Login']");
    }

    async goto() {
        await this.page.goto(url);
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = LoginPage;