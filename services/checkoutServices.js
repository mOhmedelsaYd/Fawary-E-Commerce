const ShippingService = require('./shippingServices');

class CheckoutService {
    static checkout(customer) {
        const cart = customer.cart;

        if (cart.isEmpty()) {
            throw new Error('Cart is empty. Cannot proceed with checkout.');
        }

        const items = cart.getItems();
        let subtotal = 0;

        for (const { product, quantity } of items) {
            if (product.isExpired && product.isExpired()) {
                throw new Error(`Product expired: ${product.name}`);
            }

            if (!product.isAvailable(quantity)) {
                throw new Error(`Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${quantity}`);
            }

            subtotal += product.price * quantity;
        }

        const shippableItems = cart.getShippableItems();
        const shippableProducts = [];

        shippableItems.forEach(({ product, quantity }) => {
            for (let i = 0; i < quantity; i++) {
                if (ShippingService.isValidShippableItem(product)) {
                    shippableProducts.push(product);
                }
            }
        });

        const shippingFee = ShippingService.calculateShippingFee(shippableProducts);
        const total = subtotal + shippingFee;

        if (!customer.hasEnough(total)) {
            throw new Error(`Insufficient balance. Required: $${total.toFixed(2)}, Available: $${customer.balance.toFixed(2)}`);
        }

        items.forEach(({ product, quantity }) => {
            product.reduceQuantity(quantity);
        });
        customer.deduct(total);

        console.log('\n=== CHECKOUT DETAILS ===');
        console.log(`Customer: ${customer.name}`);
        console.log(`Order subtotal: $${subtotal.toFixed(2)}`);
        console.log(`Shipping fees: $${shippingFee.toFixed(2)}`);
        console.log(`Paid amount: $${total.toFixed(2)}`);
        console.log(`Customer current balance after payment: $${customer.balance.toFixed(2)}`);

        if (shippableProducts.length > 0) {
            ShippingService.processShipping(shippableProducts);
        }

        console.log('\n=== CHECKOUT DETAILS ===');
        console.log(`Customer: ${customer.name}`);
        console.log(`Order subtotal: $${subtotal.toFixed(2)}`);
        console.log(`Shipping fees: $${shippingFee.toFixed(2)}`);
        console.log(`Paid amount: $${total.toFixed(2)}`);
        console.log(`Customer current balance after payment: $${customer.balance.toFixed(2)}`);
        
        cart.clear();
        console.log('Checkout completed successfully!');
    }
}

module.exports = CheckoutService;
