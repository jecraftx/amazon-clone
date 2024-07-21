import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js'
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
    // put the code that could cause the error in try 
    try {
        // throw 'error1';

        await loadProductsFetch();
        // load the cart with promise 
        // need for this promise to finish before next line -> use await
        const value = await new Promise((resolve, reject) => {
            // throw 'error2';
            // give it a function to run when its finished 
            loadCart(() => {
                // reject('error3');
                resolve('value3');  // to move to the next step 
            });
        });
        // parameter error contains infor about the error
        // now error1 from throw will be saved in this param 
    } catch (error) {
        console.log('Unexpected error. Please try again later...');
    }    

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
// loaded the products 
// then loaded the cart 
// then we rendered the page
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        // give it a function to run when its finished 
        loadCart(() => {
            resolve();  // to move to the next step 
        });
    })

]).then((values) => {
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
})
*/

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