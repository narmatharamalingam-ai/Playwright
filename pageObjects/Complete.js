const { expect } = require('@playwright/test');

class Complete {
    constructor(page)
    {
    this.page = page;
    this.status = page.locator("[data-test='title']");
    this.message = page.locator("[data-test='complete-header']");
    this.menu = page.locator("#react-burger-menu-btn");
    this.logot = page.locator("#logout_sidebar_link");
    
    }

    async completed()
    {
   await expect(this.status).toHaveText("Checkout: Complete!");
   await expect(this.message).toHaveText("Thank you for your order!");
     
    }

    async logout()
    {
      await this.menu.click();
      
      await this.logot.click();
      await  expect(this.page).toHaveURL("https://www.saucedemo.com/");
    }

    }module.exports = { Complete };