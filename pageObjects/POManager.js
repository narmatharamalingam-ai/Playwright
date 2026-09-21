const {loginpage} = require('../pageObjects/loginpage');
const {inventorypage} = require('../pageObjects/inventorypage');
const {yourcart} = require('../pageObjects/yourcart');
const {personalinfo}= require('../pageObjects/personalinfo');
const {checkoutpage}= require('../pageObjects/checkoutpage');
const {Complete}= require('../pageObjects/Complete');



class POManager{
    constructor(page)
    {
        this.page = page;
        this.login = new loginpage(this.page);
        this.inventory = new inventorypage(this.page); 
        this.cartpage = new yourcart(this.page);
        this.personalinfo= new personalinfo(this.page);
        this.checkoutoverview = new checkoutpage(this.page);
        this.completed = new Complete(this.page);
    }

    
    getloginpage()
    {
        return this.login;
    }
    getinventorypage()
    {
        return this.inventory;
    }

    getyourcart()
    {
        return this.cartpage;
    }
    getpersonalinfo()
    {
        return this.personalinfo;
    }
    getcheckoutpage()
    {
        return this. checkoutoverview;
    }
    getcompletepage()
    {
        return this.completed;
    }




}
module.exports={POManager};