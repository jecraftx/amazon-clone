// array to contain all of our orders 

// load the orders from the storage
// need to convert back from string to array
// in the beginning no values will be inside, so give default value 
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
// want the most recent order at the top 
// add the order at the front of the array
    orders.unshift(order);
    // every time modify this array just save to storage
    saveToStorage();
}

function saveToStorage() {
    // key, and it supports only string 
    localStorage.setItem('orders', JSON.stringify(orders));
}