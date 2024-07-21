import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";


export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });
    
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforeTaxCents * 0.1;
    const totalCents = totalBeforeTaxCents + taxCents;

    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">
                $${formatCurrency(productPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                $${formatCurrency(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalBeforeTaxCents)}
            </div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                $${formatCurrency(taxCents)}
            </div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                $${formatCurrency(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary
                js-place-order">
            Place your order
        </button>
    `;
    document.querySelector('.js-cart-quant')
      .innerHTML = cartQuantity + " items";

    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;

    // when we click the button, make a request to the backend
    // to create the order
    document.querySelector('.js-place-order')
        .addEventListener('click', async () => {
            try {
                // need to send some data to the backend (send our cart)
                // since using await we can save the response in the variable
                const response = await fetch('https://supersimplebackend.dev/orders', {
                    method: 'POST',
                // headers gives the backend more info about request
                    headers: {
                        'Content-Type': 'application/json'
                    },
                // body is the actual data to be sent 
                // also can't send object directly, so convert into a JSON string
                    body: JSON.stringify({
                        cart: cart
                    })
                });
                // to get the data that is attached to the response
                // we need to use response.json, it is also a promise, so use await in the front 
                // await will wait for response to finish before going to the next line
                // response is the order created by the backend 
                const order = await response.json();

                // after creating an order from the backend 
                // we are gonna add it to the array and save it to localStorage
                addOrder(order);

            } catch (error) {
                console.log('Unexpected error. Try again later.')
            }

            // after we create an order, go to the orders.html page 
            // use object window.location, let's us control the url 
            window.location.href = 'orders.html';
        });
}