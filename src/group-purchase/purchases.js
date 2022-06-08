class Purchases {
    mapAsSummary(rawPurchases) {
        const purchases = [];
        for (let i = 0; i < rawPurchases.length; i++) {
            const purchase = {
                id: rawPurchases[i].id,
                user: rawPurchases[i].name,
                creationDate: rawPurchases[i].creation_date
            }
            purchases.push(purchase)
        }
        return purchases;
    }

    mapToPurchase(selectedItem){
      return {
            id: selectedItem.id,
            user: selectedItem.name,
            creationDate: selectedItem.creation_date,
            shippingFee: selectedItem.shipping_fee,
            items: [],
        }
    }

    addDetail(allPurchases, newPurchase) {
        const purchaseDetail = {
            label: newPurchase.label,
            quantity: newPurchase.quantity,
            unitPrice: newPurchase.unit_price,
            amount: newPurchase.quantity * newPurchase.unit_price,
            buyer: newPurchase.name,
        }
        allPurchases.push(purchaseDetail);

    }
}

module.exports = Purchases;
