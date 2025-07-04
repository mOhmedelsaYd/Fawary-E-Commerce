class Cart {
    constructor() {
      this.items = [];
    }
  
    add(product, quantity) {
      this.items.push({ product, quantity });
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    getItems() {
      return this.items;
    }
  
    getSubtotal() {
      return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }
  
    clear() {
      this.items = [];
    }
  }
  
  module.exports = Cart;