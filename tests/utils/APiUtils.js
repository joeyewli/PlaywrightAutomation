const { test, expect, request } = require('@playwright/test');


class APiUtils {
    constructor(apiContext, loginPayload){
       this.apiContext = apiContext
       this.loginPayload = loginPayload
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        ); //200,201,2
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log("TOKEN: " + token);
        return token;
    }

    async createOrder(orderPayload){
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers:{
                    'Authorization': response.token,
                    'Content-Type': "application/json",
                }
            })
            const orderRepsonseJson = await orderResponse.json();
            response.orderId =  orderRepsonseJson.orders[0];
            console.log("Order repsonse: "+orderRepsonseJson);
            return response;
    }
}
module.exports = {APiUtils};