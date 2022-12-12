import * as reviewsDao from '../../dao/reviews-dao.js';
import { getProductById } from '../../utils/product.utils.js'

import { v4 as uuidv4 } from 'uuid';

const ReviewController = (app) => {

    const createReview = async (req, res) => {
        const id = uuidv4()
        const newReview = { ...req.body, id };
        const actualReview = await reviewsDao.createReview(newReview)
        res.json(actualReview)
    }

    const updateReview = async (req, res) => {
        const reviewIdToUpdate = req.params.rid;
        const updates = req.body;
        const status = await reviewsDao.updateReview(reviewIdToUpdate, updates)
        res.json(status);
    }
    const deleteReview = async (req, res) => {
        const reviewIdToDelete = req.params.rid;
        const status = await reviewsDao.deleteReview(reviewIdToDelete)
        res.json(status);
    }

    const findReviewsByID = async (req, res) => {
        const { pid } = req.query;
        const { userName } = req.query;
        if (userName) {
            const reviews = await reviewsDao.findReviewsByUsername(userName);
            const reviewsWithProductMapping = await Promise.all(reviews.map(async (review) => {
                const pid = review.productId;
                const productDetails = await getProductById(pid);
                return { ...review.toObject(), product: productDetails }
            }))

            res.json(reviewsWithProductMapping)
        }
        if (pid) {
            const reviews = await reviewsDao.findReviewsByProductId(pid)
            res.json(reviews)
        }
    }

    app.post('/api/reviews', createReview);
    // app.get('/api/reviews', findAllReviews);
    app.get('/api/reviews', findReviewsByID);
    // app.get('/api/reviews/:pid', findReviewsByProductId);
    app.put('/api/reviews/:rid', updateReview);
    app.delete('/api/reviews/:rid', deleteReview);

}

export default ReviewController;