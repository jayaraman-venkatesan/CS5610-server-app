import * as productsDao from '../../dao/products-dao.js';
import * as productRequestDao from '../../dao/product_request-dao.js';
import { uploadImagesToAzure } from '../../utils/upload-images.util.js';
import axios from "axios";
import fetch from "node-fetch";
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as usersDao from '../../dao/users-dao.js';

const ProductController = (app) => {

    const createProduct = async (req, res) => {
        const files = req.files;
        const username = req.body.username;
        const user = await usersDao.findByUsername(username)
        console.log(user )
        const name = `${user.firstName} ${user.lastName}`;
        const categories = req.body.category.split(',')
        const newProduct = {
            id: uuidv4(),
            ...req.body,
            categories:categories,
            status: "Pending",
            rating: 0,
            sellerUsername: username,
            seller: name
        };
        const folderName = newProduct.id;
        newProduct.thumbnail = await uploadImagesToAzure(files.thumbnail[0], folderName)
        newProduct.images = await Promise.all((files.images ?? []).map(async (image) =>
            await uploadImagesToAzure(image, folderName)
        ));
        const savedProduct = await productsDao.createProduct(
            newProduct
        )
        const productRequest = {
            "id": `REQ-${savedProduct.id}`,
            "date": new Date().toISOString(),
            "productID": savedProduct.id,
            "productName": newProduct.title,
            "seller": newProduct.seller,
            "status": "Pending"
        }
        await productRequestDao.createRequest(productRequest)
        res.json(savedProduct)
    }

    const findAllProducts = async (req, res) => {
        const products = await productsDao.findAllProducts()
        const { data: onlineProducts } = await axios.get(
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
        console.log(pid)
        const product = await productsDao.findProductByproductId(pid)
        console.log("findProductByProductId >> " + product)
        if (!product) {
            console.log("findProductByProductId doesn't exist in DB ")
            const API = `https://dummyjson.com/products/` + pid
            console.log(API)
            fetch(API)
                .then(response => response.json())
                .then((data) => {
                    console.log(data)
                    res.json({...data, categories: [data.category]})
                });
        } else {
            res.json(product)
        }

    }

    const findProductsByCategory = async (req, res) => {
        const { category } = req.query;
        const products = await productsDao.findProductsByCategory(category);

        fetch("https://dummyjson.com/products/category/" + category)
            .then(response => response.json())
            .then((data) => {
                res.json([...data.products, ...products]);
            });

    }
    const upload = multer()
    app.post('/api/products', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 5 }]), createProduct);
    app.get('/api/products', findAllProducts);
    app.get('/api/search', findProductsByCategory);
    app.get('/api/products/:pid', findProductByProductId);
    app.put('/api/products/:pid', updateProduct);
    app.delete('/api/products/:pid', deleteProduct);

}

export default ProductController;