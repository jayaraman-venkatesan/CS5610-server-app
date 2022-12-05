import * as productDao from '../../dao/product-dao.js';

const ProductController = (app) =>{
    app.post('/api/product', createProduct);
    app.get('/api/product', findAllProducts);
    app.get('/api/product/:pid', findProductByProductId);
    app.put('/api/product/:pid', updateProduct);
    app.delete('/api/product/:pid', deleteProduct);
}



const createProduct = async (req, res) => {
    const newProduct=req.body;
    const actualProduct = await productDao.createProduct(newProduct)
    res.json(actualProduct)
}
const findAllProducts  = async (req, res) => {
    const products = await productDao.findAllProducts()
    res.json(products);

}
const updateProduct = async (req, res) => {
    const productIdToUpdate = req.params.pid;
    const updates = req.body;
    const status = await productDao.updateProduct(productIdToUpdate,updates)
    res.sendStatus(status);

}
const deleteProduct = async (req, res) => {
    const productIdToDelete = req.params.pid;
    const status = await productDao.deleteProduct(productIdToDelete)
    res.sendStatus(status);
}

const findProductByProductId = async(req,res) =>{
    console.log("skngbskg")
    const pid = req.params.pid
    const product = await productDao.findProductByProductId(pid)
    const products=getAllAPIProperty("https://dummyjson.com/docs/products")
    console.log(products)
    res.json(products)
}





export default ProductController;