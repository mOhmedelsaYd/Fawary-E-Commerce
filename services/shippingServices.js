class ShippingService {
        static calculateShippingFee(items) {
        return items.reduce((sum, item) => sum + item.getWeight() * 5, 10);
        }
    
        static processShipping(items) {
        if (items.length === 0) return;
        console.log('\n=== SHIPPING DETAILS ===');
        console.log('Items to be shipped:');
        items.forEach((item) => {
            console.log(`- ${item.getName()} (Weight: ${item.getWeight()} kg)`);
        });
        const totalWeight = items.reduce((sum, i) => sum + i.getWeight(), 0);
        const fee = this.calculateShippingFee(items);
        console.log(`Total weight: ${totalWeight} kg`);
        console.log(`Shipping fee: $${fee}`);
        console.log('Items sent to shipping service successfully!');
        }
}

module.exports = ShippingService;