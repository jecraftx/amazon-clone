import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js'
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([
    // will wait for both of them to call resolve
    // before going to the next step
    new Promise((resolve) => {
        // call async code wait for it to finish 
        loadProducts(() => {
            resolve('value1')  // call resovle to go to the next step
        });
    // to create the next step
    // whatever value we will give the resolve will be saved in then 
    }),
    new Promise((resolve) => {
        // give it a function to run when its finished 
        loadCart(() => {
            resolve();  // to move to the next step 
        });
    })

]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})


/*
new Promise((resolve) => {
    // call async code wait for it to finish 
    loadProducts(() => {
        resolve('value1')  // call resovle to go to the next step
    });
// to create the next step
// whatever value we will give the resolve will be saved in then 
}).then((value) => { 
    // if we want to use resolve to wait for some code to finish 
    // we can return a new promise 
    return new Promise((resolve) => {
        // give it a function to run when its finished 
        loadCart(() => {
            resolve();  // to move to the next step 
        });
    });  

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/


/*
// above code using promises does the same thing as this call back
// gave it a callback
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
// above code using promises does the same thing as this call back
// gave it a callback
loadProducts(() => {
    // another callback another layer of nesting -> bad 
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/