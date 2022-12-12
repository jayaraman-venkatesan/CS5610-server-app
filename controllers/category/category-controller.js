import axios from 'axios';

const CategoryController = (app) => {
    const getCategories = async (req, res) => {
        const { data: externalApiCategories } = await axios.get("https://dummyjson.com/products/categories");
        res.json(externalApiCategories);
    }
    app.get('/api/product-categories', getCategories);
}

export default CategoryController;