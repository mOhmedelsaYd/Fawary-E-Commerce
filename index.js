const ExpiringProduct = require('./models/expiringProduct.module');
const ShippableProduct = require('./models/shippableProduct.module');
const nonShippableProduct = require('./models/nonShippableProduct.module');
const Customer = require('./models/customer.module');
const CheckoutService = require('./services/checkoutServices');

console.log('=== E-COMMERCE SYSTEM WITH SOLID PRINCIPLES ===\n');

const checkoutService = CheckoutService;

const cheese = new ExpiringProduct('Cheese', 12.99, 50, '2025-08-01');
const biscuits = new ExpiringProduct('Biscuits', 3.99, 100, '2025-08-20');
const expiredMilk = new ExpiringProduct('Expired Milk', 2.99, 20, '2022-08-01');
const tv = new ShippableProduct('Smart TV', 599.99, 10, 15.0);
const mobile = new ShippableProduct('Mobile Phone', 799.99, 25, 0.5);
const mobileCard = new nonShippableProduct('Mobile Scratch Card', 10.0, 500);

const customer1 = new Customer('Mohamed Elsayed', 1000.0);
const customer2 = new Customer('Mohamed Nasser', 50.0);
const customer3 = new Customer('Abdallah Gaber', 2000.0);

const runTest = (label, fn) => {
    console.log(`TEST CASE: ${label}`);
    try {
        fn();
    } catch (e) {
        console.error('Error:', e.message);
    }
    console.log('\n' + '='.repeat(50) + '\n');
};

runTest('Successful checkout with mixed items', () => {
    customer1.cart.add(cheese, 2);
    customer1.cart.add(biscuits, 3);
    customer1.cart.add(mobileCard, 1);
    checkoutService.checkout(customer1);
});

runTest('Insufficient balance', () => {
    customer2.cart.add(tv, 1);
    checkoutService.checkout(customer2);
});

runTest('Expired product', () => {
    customer3.cart.add(expiredMilk, 1);
    checkoutService.checkout(customer3);
});

runTest('Empty cart', () => {
    const emptyUser = new Customer('Empty User', 500);
    checkoutService.checkout(emptyUser);
});

runTest('Out of stock', () => {
    const stockTest = new Customer('Stock Tester', 1000);
    stockTest.cart.add(tv, 15);
    checkoutService.checkout(stockTest);
});

runTest('Large order with shipping', () => {
    const largeOrder = new Customer('Big Buyer', 5000);
    largeOrder.cart.add(tv, 2);
    largeOrder.cart.add(mobile, 1);
    largeOrder.cart.add(cheese, 5);
    checkoutService.checkout(largeOrder);
});

console.log('\n=== INVENTORY ===');
console.log(`Cheese: ${cheese.quantity}`);
console.log(`Biscuits: ${biscuits.quantity}`);
console.log(`TV: ${tv.quantity}`);
console.log(`Mobile: ${mobile.quantity}`);
console.log(`Mobile Cards: ${mobileCard.quantity}`);