const base= require('@playwright/test'); 


exports.customtest = base.test.extend(


{
    testdataforbrowse: {
        username: "standard_user",
        password:  "secret_sauce",
        productname1: "Sauce Labs Onesie",
        productname2: "Sauce Labs Fleece Jacket",
        firstname: "John",
        lastname: "Mike",
        postcode: "78945",
        canlogin :"true",
        imagesBroken: "false"
    }
}
)