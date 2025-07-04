const Product = require('./product.module');

class ShippableProduct extends Product {
    constructor(name, price, quantity, weight) {
        super(name, price, quantity);
        this.weight = weight;
    }

    getWeight() {
        return this.weight;
    }
}

module.exports = ShippableProduct;