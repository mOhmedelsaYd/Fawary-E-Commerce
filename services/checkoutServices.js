const ShippingService = require('./shippingServices');

class CheckoutService {
    static checkout(customer) {
        const cart = customer.cart;

        if (cart.isEmpty()) throw new Error('Cart is empty. Cannot proceed with checkout.');

        const items = cart.getItems();
        const shippables = [];

        for (const { product, quantity } of items) {
        if ('isExpired' in product && product.isExpired()) {
            throw new Error(`Product expired: ${product.name}`);
        }

        if (!product.isAvailable(quantity)) {
            throw new Error(`Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${quantity}`);
        }

        if ('getWeight' in product && typeof product.getWeight === 'function') {
            for (let i = 0; i < quantity; i++) {
            shippables.push(product);
            }
        }
        }

        const subtotal = cart.getSubtotal();
        const shippingFee = ShippingService.calculateShippingFee(shippables);
        const total = subtotal + shippingFee;

        if (!customer.hasEnough(total)) {
        throw new Error(`Insufficient balance. Required: $${total}, Available: $${customer.balance}`);
        }

        items.forEach(({ product, quantity }) => product.reduceQuantity(quantity));
        customer.deduct(total);

        console.log('\n=== CHECKOUT DETAILS ===');
        console.log(`Customer: ${customer.name}`);
        console.log(`Order subtotal: $${subtotal.toFixed(2)}`);
        console.log(`Shipping fees: $${shippingFee.toFixed(2)}`);
        console.log(`Paid amount: $${total.toFixed(2)}`);
        console.log(`Customer current balance after payment: $${customer.balance.toFixed(2)}`);

        if (shippables.length > 0) {
        ShippingService.processShipping(shippables);
        }

        cart.clear();
        console.log('Checkout completed successfully!');
    }
}

module.exports = CheckoutService;