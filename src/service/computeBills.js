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
    let runningTotal = 0.0
    let runningRounded = 0.0
    const rounded = (n) => Math.round(n * 100) / 100
    for(const key of Object.keys(amounts)) {
        const amount = amounts[key]
        runningTotal += purchase.shippingFee * (amount / grandTotal)
        const roundedTotal = rounded(runningTotal)
        const shipping = roundedTotal - runningRounded
        runningRounded += shipping
        const total = amount + shipping
        bills.push({ buyer: key, amount: amount, shipping: shipping, total: total })
    }
    return bills
}

module.exports = computeBills
