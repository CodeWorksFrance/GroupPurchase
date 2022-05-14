const computeBills = (purchase) => {
    const bill = { buyer: purchase.items[0].buyer, amount: 0, shipping: purchase.shippingFee, total: 0 }
    purchase.items.forEach(item => {
        bill.amount += item.unitPrice * item.quantity
        bill.total = bill.amount + purchase.shippingFee
    })
    return [bill]
}

module.exports = computeBills
