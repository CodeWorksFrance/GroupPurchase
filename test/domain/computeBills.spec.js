const computeBills = require('../../src/domain/computeBills')

describe('computeBills', () => {
    it('should create one bill for a purchase by one person', () => {
        const purchase = { shippingFee: 10.0, items: [
                { label: "paper", unitPrice: 4.5, quantity: 10, buyer: 'Clara' },
                { label: "pencils", unitPrice: 2, quantity: 5, buyer: 'Clara' }] }
        result = computeBills(purchase)
        expected = [{ buyer: 'Clara', amount: 45.0 + 10.0, shipping: 10.0, buyer: 'Clara'}]
        expect(result).toBe(expected)
    })
})
