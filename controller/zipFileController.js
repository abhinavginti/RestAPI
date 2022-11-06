// const decompress = require('decompress')
const fs = require('fs')
const { exec } = require('child_process')

exports.decompressZipFile = async (req, res) => {
    try {
        if (req.file) {
            // await decompress('./Upload/' + req.file.filename, 'Upload',{
            //     map: file => {
            //         file.path = Date.now() + file.path
            //         return file
            //     }
            // })
            const destinationFolder = req.file.filename.substring(0, req.file.filename.lastIndexOf('.'))
            const cmd = `cd "./Upload" && mkdir ${destinationFolder} && tar -xf "${req.file.filename}" -C ${destinationFolder}`
            exec(cmd, (error, stdout, stderr) => {
                fs.unlink('./Upload/' + req.file.filename, (err) => {
                    if (err) throw err;
                    console.log(req.file.filename + ' was deleted');
                })
                if (error) {
                    console.error(error)
                    return res.status(500).send({ error: error })

                }
                if (stderr) {
                    console.error(stderr);
                    return res.status(500).send({ error: stderr })
                }
                console.log(stdout)
                res.send('File Successfully Uploaded')
            })
        } else {
            throw "No file found ..."
        }
    } catch (err) {
        console.error(err)
        res.status(500).send({ error: err })
    }
}