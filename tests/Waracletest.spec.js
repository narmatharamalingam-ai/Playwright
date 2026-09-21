const { test, expect } = require('@playwright/test');
const {customtest}= require('../Utils/test-base');


const { POManager } = require('../pageObjects/POManager');
//json->string->js object
const dataset = JSON.parse(JSON.stringify(require("../Utils/testdata.json")));
const endtoenddataset = JSON.parse(JSON.stringify(require("../Utils/endtoendtestdata.json")));



// 1. Login flow to test 1. standard user 2. locked used 3. error user 4. performance glitch user  


for(const data of dataset)
{
        test(`loginflow for ${data.username} `, async ({ page }) => {

        const poManager = new POManager(page);
        const login = poManager.getloginpage(page); // call the function that directs to the login page from POMAnger
        await login.goTo(); // calls the method in loginpage object
        await login.validLogin(data.username, data.password);
        
        if(data.canlogin && data.imagesBroken )
        {
            const inventory = poManager.getinventorypage(page);
            await inventory.userstatus(data.username);
        }
                
        }
    );
}



//2. End to end testcase

       for(const etedata of endtoenddataset){ 
        test(`EndtoEndPositive for ${etedata.username}`, async ({ page }) => {

        const poManager = new POManager(page);
        const login = poManager.getloginpage(page); // call the function that directs to the login page from POMAnger
        await login.goTo(); // calls the method in loginpage object
        await login.standardlogin(etedata.username,etedata.password);
        const inventory = poManager.getinventorypage(page);

        if(etedata.username === "error_user"){
            await inventory.selectItemerror(etedata.productname);
        }
        else{
        const price1 =await inventory.selectItem(etedata.productname);
        await inventory.Shopcart();  
        const cartpage = poManager.getyourcart(page);
        await cartpage.checkout(price1);
        const personalinfo = poManager.getpersonalinfo(page);
        await personalinfo.fillindetails(etedata.firstname, etedata.lastname, etedata.postcode);
        await personalinfo.continueto();
        const overviewpage = poManager.getcheckoutpage(page);
        await overviewpage.finishpurchase(etedata.productname,price1);
        const completedpage = poManager.getcompletepage(page);
        await completedpage.completed();
        await completedpage.logout();
        }

    });}

// 3. Browse products and add to cart 
        customtest("Browserproducts_addtocart", async ({ page,testdataforbrowse }) => {

        const poManager = new POManager(page);
        const login = poManager.getloginpage(page); // call the function that directs to the login page from POMAnger
        await login.goTo(); // calls the method in loginpage object
        await login.standardlogin(testdataforbrowse.username,testdataforbrowse.password);
        const inventory = poManager.getinventorypage(page);
        await inventory.selectItem(testdataforbrowse.productname1);
        }
    );

// 4. Add 2 items to the cart  and remove one item

  customtest("add2itemstocart_remove1item", async ({ page,testdataforbrowse }) => {

        const poManager = new POManager(page);
        const login = poManager.getloginpage(page); // call the function that directs to the login page from POMAnger
        await login.goTo(); // calls the method in loginpage object
        await login.standardlogin(testdataforbrowse.username,testdataforbrowse.password);
        const inventory = poManager.getinventorypage(page);
        await inventory.select2Item(testdataforbrowse.productname1,testdataforbrowse.productname2);
        await inventory.removeanitem(testdataforbrowse.productname1);
        }
    );

// 5. removebuttoninyourcartpage
customtest("removebuttoninyourcartpage", async ({ page, testdataforbrowse }) => {

    const poManager = new POManager(page);

    const login = poManager.getloginpage();  // object reffering to the page object loginpage
    await login.goTo(); // calls the method in loginpage object
    await login.standardlogin(testdataforbrowse.username, testdataforbrowse.password);

    const inventory = poManager.getinventorypage(page);
    await inventory.selectItem(testdataforbrowse.productname1);
    await inventory.Shopcart();

    const cartpage = poManager.getyourcart(page);
    await cartpage.remove();
});

//6. cancelbuttoninpersonalinfopage
customtest("cancelbuttoninpersonalinfopage", async ({ page, testdataforbrowse }) => {

    const poManager = new POManager(page);


    const login = poManager.getloginpage(); // call the function that directs to the login page from POMAnger
    await login.goTo(); // calls the method in loginpage object
    await login.standardlogin(testdataforbrowse.username, testdataforbrowse.password);

    const inventory = poManager.getinventorypage(page);
    const price1  = await inventory.selectItem(testdataforbrowse.productname1);
    await inventory.Shopcart();

    const cartpage = poManager.getyourcart(page);
    await cartpage.checkout(price1);

    const personalinfo = poManager.getpersonalinfo(page);
    await personalinfo.fillindetails(testdataforbrowse.firstname, testdataforbrowse.lastname, testdataforbrowse.postcode); //returns product price
    await personalinfo.cancelfrom();


});



