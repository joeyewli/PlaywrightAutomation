const { test, expect, request } = require('@playwright/test');
const {APiUtils} = require('./utils/APiUtils.js');
const loginPayload = { userEmail: "Joelimemberships@gmail.com", userPassword: "Password123" };
const orderPayload = { orders:[{country:"Reunion",productOrderedId:"67a8dde5c0d3e6622a297cc8"},{country:"Reunion",productOrderedId:"67a8df1ac0d3e6622a297ccb"}]}


let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
    
});

test.beforeEach(() => {

});

test("Client App Login", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    const products = page.locator(".card-body");
    const email = "Joelimemberships@gmail.com";
    const count = await products.count();

    await page.goto("https://rahulshettyacademy.com/client");
   
    await page.locator("[routerlink='/dashboard/myorders']").first().click();
    await page.locator(".table").waitFor();//tbody tr
    const table = await page.locator(".table");
    const order = table.locator(" .ng-star-inserted"); //th 
    const orderCount = await order.count();
    await console.log("OrderID: "+ response.orderId);
    await console.log("Ordercount: "+ orderCount);
    for (let i = 0; i < orderCount; ++i){
        const thisOrderID = await order.nth(i).locator("[scope='row']").textContent();
        await console.log("Step: "+ i);
        await console.log("thisorderID: "+ thisOrderID);
        if ( await response.orderId.includes(thisOrderID.trim())){
            await console.log("Stepb: "+ i);
            await order.nth(i).locator(".btn").first().click();
            break;
        }

    }
    await page.locator(".email-title").waitFor();
    await sleep(4000);
})

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

