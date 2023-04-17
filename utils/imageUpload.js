if (process.env.NODE_ENV !== 'production')
    require('dotenv').config()

const multer = require('multer')
const MulterAzureStorage = require('multer-azure-storage')

const allowedFileTypes = ['image/jpeg', 'image/png'];

const upload = multer({
    storage: new MulterAzureStorage({
        azureStorageConnectionString: process.env.CONNECTION_STRING,
        containerName: process.env.CONTAINER_NAME,
        containerSecurity: 'blob'
    }),
    fileFilter: (req, file, cb) => {
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'));
        }
    }
})

module.exports = upload