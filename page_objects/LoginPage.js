const url = "https://rahulshettyacademy.com/client";
//redirects to https://rahulshettyacademy.com/client/auth/login if not logged in

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

    async isLoginPage() {
        await this.emailInput.waitFor();
        await this.passwordInput.waitFor();
        await this.loginButton.waitFor();
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports = LoginPage;