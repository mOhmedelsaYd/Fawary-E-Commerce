const Cart = require('./cart.module');

class Customer {
    constructor(name, balance) {
        this.name = name;
        this.balance = balance;
        this.cart = new Cart();
    }

    deduct(amount) {
        this.balance -= amount;
    }

    hasEnough(amount) {
        return this.balance >= amount;
    }
}

module.exports = Customer;