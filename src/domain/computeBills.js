const computeBills = (purchase) => {
    const amounts = {}
    let grandTotal = 0
    purchase.items.forEach(item => {
        if(!amounts[item.buyer])
            amounts[item.buyer] = 0
        const amount = item.unitPrice * item.quantity
        amounts[item.buyer] += amount
        grandTotal += amount
    })
    const bills = []
    for(const key of Object.keys(amounts)) {
        const amount = amounts[key]
        const shipping = purchase.shippingFee * (amount / grandTotal)
        const total = amount + shipping
        bills.push({ buyer: key, amount: amount, shipping: shipping, total: total })
    }
    return bills
}

module.exports = computeBills
