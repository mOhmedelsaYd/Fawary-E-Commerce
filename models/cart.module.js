class Cart {
  constructor() {
    this.items = [];
  }

  add(product, quantity) {
    if (quantity <= 0) {
      throw new Error(`Quantity must be greater than 0 for ${product.name}`);
    }

    if (!product.isAvailable(quantity)) {
      if (product.isExpired && product.isExpired()) {
        throw new Error(`Cannot add ${product.name} - product is expired`);
      }
      throw new Error(`Cannot add ${product.name} - insufficient stock. Available: ${product.quantity}, Requested: ${quantity}`);
    }

    const existingItem = this.items.find(item => item.product === product);
    if (existingItem) {
      const newTotalQuantity = existingItem.quantity + quantity;
      if (!product.isAvailable(newTotalQuantity)) {
        throw new Error(`Cannot add ${product.name} - total quantity (${newTotalQuantity}) exceeds available stock (${product.quantity})`);
      }
      existingItem.quantity = newTotalQuantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  isEmpty() {
    return this.items.length === 0;
  }

  getItems() {
    return this.items;
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  clear() {
    this.items = [];
  }

  getShippableItems() {
    return this.items.filter(item =>
      typeof item.product.getWeight === 'function'
    );
  }

  getNonShippableItems() {
    return this.items.filter(item =>
      typeof item.product.getWeight !== 'function'
    );
  }
}

module.exports = Cart;