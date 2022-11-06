const express = require('express')
const router = new express.Router();
const zipFileController = require('../controller/zipFileController')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Upload')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req,file,cb) => {
        if(file.mimetype === 'application/zip'){
            cb(null,true);
        }else{
            cb(new Error("Not a zip File"),false)
        }
    }
})

router.post('/zipFile', upload.single('file'), zipFileController.decompressZipFile)

module.exports = router