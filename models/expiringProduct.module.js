const Product = require('./product.module');

class ExpiringProduct extends Product {
    constructor(name, price, quantity, expiryDate) {
        super(name, price, quantity);
        this.expiryDate = new Date(expiryDate);
    }

    isExpired() {
        return new Date() > this.expiryDate;
    }

    isAvailable(requestedQty) {
        return super.isAvailable(requestedQty) && !this.isExpired();
    }

    getExpiryDate() {
        return this.expiryDate;
    }
}

module.exports = ExpiringProduct;