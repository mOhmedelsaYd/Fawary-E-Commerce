const Product = require('./product.module');

class ShippableProduct extends Product {
    constructor(name, price, quantity, weight) {
        super(name, price, quantity);
        this.weight = weight;
    }

    getName() {
        return this.name;
    }

    getWeight() {
        return this.weight;
    }
}

module.exports = ShippableProduct;