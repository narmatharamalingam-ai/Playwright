const { expect } = require('@playwright/test');


class checkoutpage {

    constructor(page) {
        this.page = page;
        this.inventoryitem = page.locator("[data-test='inventory-item']");
        this.itemname = page.locator(".inventory_item_name");
        this.itemquanty = this.inventoryitem.locator("[data-test='item-quantity']");
        this.itemprice = this.inventoryitem.locator("[data-test='inventory-item-price']");

        this.paymentinfo = page.locator("[data-test='payment-info-value']");
        this.shippinginfo = page.locator("[data-test='shipping-info-value']");
        this.itemtotal = page.locator("[data-test='subtotal-label']");
        this.tax = page.locator("[data-test='tax-label']");
        this.total = page.locator("[data-test='total-label']");
        this.finish = page.getByRole("button", { name: 'Finish' });
        this.cancel = page.getByRole("button", { name: 'cancel' });

    }


    async finishpurchase(productname, price1) {
        await expect(this.itemname).toHaveText(productname);
        await expect(this.itemprice).toHaveText(price1);
        await expect (this.paymentinfo).toHaveText("SauceCard #31337");
        await expect (this.shippinginfo).toHaveText("Free Pony Express Delivery!");
        const tax = await this.tax.textContent();
        const taxamount = parseFloat(tax.replace(/[^0-9.]/g,''));
        const price = parseFloat(price1.replace(/[^0-9.]/g,''));
        const totalprice = (taxamount+price).toFixed(2);
        await expect (this.total).toHaveText("Total: $"+totalprice);
        
           
        await this.finish.click();

    }
} module.exports = { checkoutpage };