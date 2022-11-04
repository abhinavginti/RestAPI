const decompress = require('decompress')
const fs = require('fs')

exports.decompressZipFile = async (req, res) => {
    try {
        if (req.file) {
            await decompress('./Upload/' + req.file.filename, 'Upload')
            fs.unlink('./Upload/' + req.file.filename, (err) => {
                if (err) throw err;
                console.log(req.file.filename + ' was deleted');
            })
            res.send('File Successfully Uploaded')
        }else{
            throw "No file found ..."
        }   
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}