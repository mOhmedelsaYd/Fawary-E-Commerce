const Product = require('./product.module');

class NonShippableProduct extends Product {
    constructor(name, price, quantity) {
        super(name, price, quantity);
    }
}

module.exports = NonShippableProduct;