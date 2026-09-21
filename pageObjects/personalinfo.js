const { expect } = require('@playwright/test');

class personalinfo{

    constructor(page)
        {
            this.page = page;
            this.firstname =page.getByPlaceholder("First Name");
            this.lastname = page.getByPlaceholder("Last Name");
            this.zip = page.getByPlaceholder("Zip/Postal Code");
            this.continue= page.locator("[data-test='continue']");
            this.cancel = page.locator("[data-test='cancel']");
        }

        async fillindetails(firstname,lastname,postcode)
        {
            await this.firstname.fill(firstname);
            await this.lastname.fill(lastname);
            await this.zip.fill(postcode);
        }
        async continueto()
        {
            await this.continue.click();
        }

        async cancelfrom()
        {
           await this.cancel.click();
           await expect(this.page).toHaveURL("https://www.saucedemo.com/cart.html");
        }
        
        

    }
    module.exports={personalinfo};