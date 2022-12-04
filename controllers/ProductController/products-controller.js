import * as productsDao from '../../dao/products-dao.js';

const ProductController = (app) => {

    const createProduct = async (req, res) => {
        const newProduct = req.body;
        const actualProduct = await productsDao.createProduct(newProduct)
        res.json(actualProduct)
    }
    const findAllProducts = async (req, res) => {
        const products = await productsDao.findAllProducts()
        res.json(products);

    }
    const updateProduct = async (req, res) => {
        const productIdToUpdate = req.params.pid;
        const updates = req.body;
        const status = await productsDao.updateProduct(productIdToUpdate, updates)
        res.sendStatus(status);

    }
    const deleteProduct = async (req, res) => {
        const productIdToDelete = req.params.pid;
        const status = await productsDao.deleteProduct(productIdToDelete)
        res.sendStatus(status);
    }

    const findProductByProductId = async (req, res) => {
        const pid = req.params.pid
        const product = await productsDao.findProductByproductId(pid)
        res.json(product)
    }

    const findProductsByCategory = async (req, res) => {
        const { category } = req.query;
        const products = await productsDao.findProductsByCategory(category)
        res.json(products)
    }


    app.post('/api/product', createProduct);
    app.get('/api/product', findAllProducts);
    app.get('/api/product/:pid', findProductByProductId);
    app.put('/api/product/:pid', updateProduct);
    app.delete('/api/product/:pid', deleteProduct);

}


export default ProductController;