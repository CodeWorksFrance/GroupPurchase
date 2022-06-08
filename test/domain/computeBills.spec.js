const computeBills = require('../../src/service/CoreCalculator')

describe('computeBills', () => {
    it('should create one bill for a purchase of one item by one person', () => {
        const purchase = { shippingFee: 10.0, items: [
                { label: "paper", unitPrice: 4.5, quantity: 10, buyer: 'Clara' }]}
        expect(computeBills(purchase)).toStrictEqual([{ buyer: 'Clara', amount: 45.0, shipping: 10.0, total: 55.0}])
    })
    it('should create one bill for a purchase of several items by one person', () => {
        const purchase = { shippingFee: 10.0, items: [
                { label: "paper", unitPrice: 4.5, quantity: 10, buyer: 'Clara' },
                { label: "pencil", unitPrice: 1.0, quantity: 5, buyer: 'Clara' }]}
        expect(computeBills(purchase)).toStrictEqual([{ buyer: 'Clara', amount: 50.0, shipping: 10.0, total: 60.0}])
    })
    it('should create several bills for a purchase of several items by several persons, with 0 shipping fee', () => {
        const purchase = { shippingFee: 0.0, items: [
                { label: "paper", unitPrice: 4.5, quantity: 10, buyer: 'Clara' },
                { label: "pencil", unitPrice: 1.0, quantity: 5, buyer: 'Clara' },
                { label: "flowers", unitPrice: 4.0, quantity: 3, buyer: 'Desmond' }]}
        expect(computeBills(purchase)).toStrictEqual([{ buyer: 'Clara', amount: 50.0, shipping: 0.0, total: 50.0},
                                                               { buyer: 'Desmond', amount: 12.0, shipping: 0.0, total: 12.0}])
    })
    it('should create several bills for several buyers with proportional shipping fee', () => {
        const purchase = { shippingFee: 10.0, items: [
                { label: "paper", unitPrice: 10.0, quantity: 9, buyer: 'Clara' },
                { label: "flowers", unitPrice: 10.0, quantity: 1, buyer: 'Desmond' }]}
        expect(computeBills(purchase)).toStrictEqual(
            [{ buyer: 'Clara', amount: 90.0, shipping: 9.0, total: 99.0},
                { buyer: 'Desmond', amount: 10.0, shipping: 1.0, total: 11.0}])
    })
    it('should create several bills for several buyers with correct rounding of shipping fee', () => {
        const purchase = { shippingFee: 10.0, items: [
                { label: "paper", unitPrice: 10.0, quantity: 3, buyer: 'Clara' },
                { label: "flowers", unitPrice: 15.0, quantity: 2, buyer: 'Desmond' },
                { label: "pencil", unitPrice: 3.0, quantity: 10, buyer: 'Elrod' }] }
        expect(computeBills(purchase)).toStrictEqual(
            [{ buyer: 'Clara', amount: 30.0, shipping: 3.33, total: 33.33},
                { buyer: 'Desmond', amount: 30.0, shipping: 3.34, total: 33.34 },
                { buyer: 'Elrod', amount: 30, shipping: 3.33, total: 33.33 }])
    })
})
