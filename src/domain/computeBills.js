const computeBills = (purchase) => {
    const amounts = {}
    purchase.items.forEach(item => {
        if(!amounts[item.buyer])
            amounts[item.buyer] = 0
        amounts[item.buyer] += item.unitPrice * item.quantity
    })
    const bills = []
    for(const key of Object.keys(amounts)) {
        bills.push({buyer: key, amount: amounts[key], shipping: purchase.shippingFee, total: amounts[key] + purchase.shippingFee})
    }
    return bills
}

module.exports = computeBills
