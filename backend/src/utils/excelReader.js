const readXlsxFile = require('read-excel-file/node');

// File path.
const excel = {

    read: async (pathToFile) => {
        return await readXlsxFile(pathToFile)
    }
}

module.exports = excel