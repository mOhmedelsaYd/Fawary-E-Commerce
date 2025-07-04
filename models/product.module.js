class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    } 

    isAvailable(requestedQty) {
        return requestedQty <= this.quantity;
    }

    reduceQuantity(q) {
        this.quantity -= q;
    }
}

module.exports = Product;