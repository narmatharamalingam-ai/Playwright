const { expect } = require('@playwright/test');


class yourcart {
    constructor(page) {
        this.page = page;
        this.itemcart =page.locator(".cart_item");
        this.itemprice = page.locator('.cart_item').locator("[data-test='inventory-item-price']");
        this.checkoutbutton = page.getByText('Checkout', { exact: true });
        this.removebutton = page.locator(".cart_item").getByText('Remove', { exact: true });
        this.continueshopping = page.getByText('Continue Shopping', { exact: true });
        this.shoppingbadge = page.locator("[data-test='shopping-cart-badge']");

    }

    async checkout(price1) {
        await expect( this.itemprice).toHaveText(price1);
        await this.checkoutbutton.click();
        await this.page.waitForLoadState('networkidle');

    }

    async remove() {
        await this.removebutton.click();
        await expect (this.itemcart).not.toBeVisible();
        await expect (this.shoppingbadge).not.toBeVisible();
         
}
}
module.exports = { yourcart };