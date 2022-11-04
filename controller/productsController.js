const productModel = require('../Model/product.model')

exports.createProduct = async (req, res) => {
    try{
        const product = new productModel(req.body);
        await product.save();
        res.send('Product Added')
    }catch(err){
        console.error(err)
        res.status(500).send({error:err})
    }
}

exports.renderProducts = async (req,res) => {
    try{
        const products = await productModel.find({}).lean()
        res.status(200).render('main',{
            title: 'Lenskart Product',
            products : products
        })
    }catch(err){
        console.error(err)
        res.status(500).send({error:err})
    }
}