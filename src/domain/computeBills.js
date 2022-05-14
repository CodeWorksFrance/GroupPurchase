const computeBills = (purchase) => {
    const item = purchase.items[0]
    const amount = item.unitPrice * item.quantity
    const total = amount + purchase.shippingFee
    const bill = { buyer: item.buyer, amount: amount, shipping: purchase.shippingFee, total: total }
    return [bill]
}

module.exports = computeBills
