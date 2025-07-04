class ShippingService {
    static calculateShippingFee(items) {
        if (items.length === 0) return 0;

        const baseFee = 10;
        const additionalItemFee = 5;
        const totalFee = baseFee + (items.length - 1) * additionalItemFee;

        const totalWeight = items.reduce((sum, item) => sum + item.getWeight(), 0);
        const weightFee = totalWeight * 2;

        return totalFee + weightFee;
    }

    static processShipping(items) {
        if (items.length === 0) return;

        console.log('\n=== SHIPPING DETAILS ===');
        console.log('Items to be shipped:');
        items.forEach((item) => {
            console.log(`- ${item.getName()} (Weight: ${item.getWeight()} kg)`);
        });

        const totalWeight = items.reduce((sum, item) => sum + item.getWeight(), 0);
        const fee = this.calculateShippingFee(items);

        console.log(`Total weight: ${totalWeight.toFixed(2)} kg`);
        console.log(`Shipping fee: $${fee.toFixed(2)}`);
        console.log('Items sent to shipping service successfully!');
    }

    static isValidShippableItem(item) {
        return typeof item.getName === 'function' &&
            typeof item.getWeight === 'function';
    }
}

module.exports = ShippingService;