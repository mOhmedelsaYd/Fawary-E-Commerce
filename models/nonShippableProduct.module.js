const Product = require('./product.module');

class nonShippableProduct extends Product {
    constructor(name, price, quantity) {
        super(name, price, quantity);
        // does not expire or require shipping
    }
}

module.exports = nonShippableProduct;