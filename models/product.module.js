class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    isAvailable(requestedQty) {
        return requestedQty <= this.quantity && requestedQty > 0;
    }

    reduceQuantity(q) {
        if (q > this.quantity) {
            throw new Error(`Cannot reduce quantity by ${q}, only ${this.quantity} available`);
        }
        this.quantity -= q;
    }

    getName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }

    getQuantity() {
        return this.quantity;
    }
}

module.exports = Product;