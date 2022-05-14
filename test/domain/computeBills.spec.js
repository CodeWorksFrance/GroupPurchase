const computeBills = require('../../src/domain/computeBills')

describe('computeBills', () => {
    it('should create one bill for a purchase of one item by one person', () => {
        const purchase = { shippingFee: 10.0, items: [
                { label: "paper", unitPrice: 4.5, quantity: 10, buyer: 'Clara' }]}
        expect(computeBills(purchase)).toStrictEqual([{ buyer: 'Clara', amount: 45.0, shipping: 10.0, total: 55.0}])
    })
})
