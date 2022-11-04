const express = require('express')
const app = express();
const mongoose = require('mongoose')
const hbs = require('express-handlebars')

const productRouter = require('./Router/products')
const zipFileRouter = require('./Router/zipFile')

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.static('public'))

app.use(productRouter)
app.use(zipFileRouter)

app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({
    extname: 'hbs',
    layoutsDir : __dirname + '/views/layouts',
    defaultLayout: 'index'
}))

mongoose.connect('mongodb+srv://abhinavginti:eojay8VdTDhp96yP@cluster0.gbpfp.mongodb.net/lenskart?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Connection Successful')
}).catch((err) => console.log(err))

app.listen(PORT, () => {
    console.log('listening to port: ', PORT)
})
