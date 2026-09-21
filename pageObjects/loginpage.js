const { expect } = require("@playwright/test");

class loginpage {
    constructor(page) {

        this.page = page;
        this.username = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");
        this.loginInButton = page.getByRole("button", { name: 'Login' });
        this.errorbutton = page.locator("[data-test='error']");

    }


    async goTo() {
        await this.page.goto("https://www.saucedemo.com/");
    }

    async validLogin(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginInButton.click();
        const lockmsg = "Epic sadface: Sorry, this user has been locked out.";
       

        if (username === "locked_out_user") {

            await expect(this.errorbutton).toBeVisible();
            await expect(this.errorbutton).toContainText(lockmsg);
            
            await expect(this.page).not.toHaveURL("https://www.saucedemo.com/inventory.html");

        }
        if (username === "standard_user") {

            await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
            
            await this.page.waitForLoadState('networkidle');
        }

    }

    async standardlogin(username, password) {

        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginInButton.click();
        await expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await this.page.waitForLoadState('networkidle');


    }
}
module.exports = { loginpage };