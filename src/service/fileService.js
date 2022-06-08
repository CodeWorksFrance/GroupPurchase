const csvParse = require('csv-parse')

class FileService {

    importItems(csvData) {
        const parser = csvParse.parse({delimiter: ',', columns: true, trim: true})
        const items = []
        parser.on('readable', () => {
            let record;
            while ((record = parser.read()) !== null) {
                const purchaseItem = {
                    label: record.item,
                    unitPrice: Number.parseFloat(record.unitp),
                    quantity: Number.parseInt(record.qty),
                    buyer: record.buyer
                }
                items.push(purchaseItem)
            }
        })
        parser.on('error', (err) => {
            console.error(err.message)
        })
        parser.write(csvData)
        parser.end()
        return items
    }

}

module.exports = FileService;
