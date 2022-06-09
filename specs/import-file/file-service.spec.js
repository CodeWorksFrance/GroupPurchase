const FileService = require('../../src/import-file/fileService');

describe('importItems', () => {
    it('should parse csv data and produce items', () => {
        const csvData =
            `item              , unitp  , qty , amount , buyer
            pencils           ,   0.10 ,  10 ,  1.00 , Bertrand
            paper             ,   0.15 ,   8 ,  1.00 , Clara
            rubber            ,   0.10 ,  10 ,  1.00 , Alice `

        let importedItems = new FileService().importItems(csvData);

        expect(importedItems).toStrictEqual([
            {label: 'pencils', unitPrice: 0.10, quantity: 10, buyer: 'Bertrand'},
            {label: 'paper', unitPrice: 0.15, quantity: 8, buyer: 'Clara'},
            {label: 'rubber', unitPrice: 0.10, quantity: 10, buyer: 'Alice'}])
    })
})