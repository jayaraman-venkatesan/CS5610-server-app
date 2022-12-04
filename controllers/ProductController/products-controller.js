import * as productsDao from '../../dao/products-dao.js';
import axios from "axios";

const ProductController = (app) => {

    const createProduct = async (req, res) => {
        const newProduct = req.body;
        const actualProduct = await productsDao.createProduct(newProduct)
        res.json(actualProduct)
    }
    const findAllProducts = async (req, res) => {
        const products = await productsDao.findAllProducts()
        const {data: onlineProducts} = await axios.get(
            "https://mocki.io/v1/3dac7535-7824-40a4-825e-948124e70222");
        res.json([...onlineProducts, ...products]);

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
        console.log("findProductByProductId >> " + product)
        if (Object.keys(product).length === 0) {
            console.log("findProductByProductId doesnt exist in DB ")
            console.log(pid)
            const API =  "https://dummyjson.com/products/"+pid;

            fetch(API)

                .then(response => response.json())

                .then((data)=>{res.json(data.products)});
        } else {
            res.json(product)
        }

    }

    const findProductsByCategory = async (req, res) => {
        const {category} = req.query;
        console.log("category >> " + category)
        const {data: onlineProducts} = await axios.get(
            "https://mocki.io/v1/3dac7535-7824-40a4-825e-948124e70222");
        const array = onlineProducts.filter(d => d.category === category);
        const products = await productsDao.findProductsByCategory(category);
        console.log(array);
        console.log(products);
        res.json([...array, ...products]);
    }

    app.post('/api/products', createProduct);
    app.get('/api/products', findAllProducts);
    app.get('/api/search', findProductsByCategory);
    app.get('/api/products/:pid', findProductByProductId);
    app.put('/api/products/:pid', updateProduct);
    app.delete('/api/products/:pid', deleteProduct);

}

export default ProductController;