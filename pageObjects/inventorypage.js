const { expect } = require('@playwright/test');


class inventorypage {

    constructor(page) {
        this.page = page;
        this.itempage = page.locator(".inventory_container")
        this.inventoryitem = page.locator(".inventory_item");
        this.addtocart = page.getByText('Add to cart', { exact: true });
        this.shoppingcart = page.locator("[data-test='shopping-cart-link']");
        this.shoppingbadge = page.locator("[data-test='shopping-cart-badge']");
        this.itmprice = page.locator("[data-test='inventory-item-price']");
        this.inventoryimages = page.locator('img.inventory_item_img:visible');
        this.filter =  page.locator(".product_sort_container");

    }

       
    async userstatus(username) {
         await expect(this.inventoryitem.first()).toBeVisible();
        const inventorycount = await this.inventoryitem.count();
        const imgsrc = [];
        for (let i = 0; i < inventorycount; i++) {
            imgsrc.push(await this.inventoryimages.nth(i).getAttribute('src'));
        }
        const unique = new Set(imgsrc);
        const imagelength = imgsrc.length;
        const uniquesize = unique.size;
        if (username === "problem_user") {
           
          expect(uniquesize).toBe(1);
            

        }
        else if (username === "visual_user") {
           expect(uniquesize).toBe(imagelength);
           expect(imgsrc.some(s => s && s.includes("sl-404"))).toBe(true);
            
        }

    }




    async selectItem(productname) {
        const selectitem = this.inventoryitem.filter({ hasText: productname });
        await selectitem.getByRole("button", { name: 'Add to cart' }).click();
        const productprice = await selectitem.locator("[data-test='inventory-item-price']").textContent();
        await expect(this.shoppingbadge).toBeVisible();
        await expect(this.shoppingbadge).toHaveText('1');
        return productprice;


    }
    async selectItemerror(productname) {
        const selectitem = this.inventoryitem.filter({ hasText: productname });
        await selectitem.getByRole("button", { name: 'Add to cart' }).click();
        const productprice = await selectitem.locator("[data-test='inventory-item-price']").textContent();
        await expect(this.shoppingbadge).toBeHidden();
       
    }

    async Shopcart() {
        await this.shoppingcart.click();


    }
    async select2Item(productname1, productname2) {
        const selectitem1 = this.inventoryitem.filter({ hasText: productname1 });
        await selectitem1.getByRole("button", { name: 'Add to cart' }).click();
        await expect(this.shoppingbadge).toBeVisible();
        await expect(this.shoppingbadge).toHaveText('1');
        const selectitem2 = this.inventoryitem.filter({ hasText: productname2 });
        await selectitem2.getByRole("button", { name: 'Add to cart' }).click();
        await expect(this.shoppingbadge).toBeVisible();
        await expect(this.shoppingbadge).toHaveText('2');



    }

    async removeanitem(productname1) {
        if ((this.shoppingbadge)) {
            const selectitem1 = this.inventoryitem.filter({ hasText: productname1 });
            await selectitem1.getByRole("button", { name: 'Remove' }).click();
            await expect(this.shoppingbadge).toHaveText('1');
        }


    }
    async Shopcart() {
        await this.shoppingcart.click();


    }

  

}

module.exports = { inventorypage };