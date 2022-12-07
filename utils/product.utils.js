
import fetch from "node-fetch";
import * as productsDao from '../dao/products-dao.js'

export const getProductById = async (pid) => {
    console.log(pid)
        const product = await productsDao.findProductByproductId(pid)
        console.log("findProductByProductId >> " + product)
        if (!product) {
            console.log("findProductByProductId doesnt exist in DB ")
            const API = `https://dummyjson.com/products/` + pid
            console.log(API)

            const response = await fetch(API);
            const apiProduct = await response.json();
            return apiProduct;

            // fetch(API)
            //     .then(response => response.json())
            //     .then((data) => {
            //         console.log(data)
            //         return data
            //     });
        } else {
            return product;
        }
}