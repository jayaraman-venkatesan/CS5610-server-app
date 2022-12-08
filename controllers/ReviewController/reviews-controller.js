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
    const findAllReviews = async (req, res) => {
        const reviews = await reviewsDao.findAllReviews()
        res.json(reviews);
    }

    const updateReview = async (req, res) => {
        const reviewIdToUpdate = req.params.rid;
        const updates = req.body;
        const status = await reviewsDao.updateReview(reviewIdToUpdate, updates)
        res.sendStatus(status);
    }
    const deleteReview = async (req, res) => {
        const reviewIdToDelete = req.params.rid;
        const status = await reviewsDao.deleteReview(reviewIdToDelete)
        res.json(status);
    }

    const findReviewsByProductId = async (req, res) => {
        const pid = req.params.pid
        const review = await reviewsDao.findReviewsByProductId(pid)
        res.json(review)
    }

    const findReviewsByID = async (req, res) => {

        const { pid } = req.query;
        const { uid } = req.query;

        console.log("here uid", uid)

        if (uid) {
            const result = await (findReviewsByUserId(uid))
            res.json(result)
        }

        if (pid) {
            findReviewsByProductId(req, res);
        }


    }

    const findReviewsByUserId = async (uid) => {
        console.log(uid)
        const reviews = await reviewsDao.findReviewsByUserId(uid);

        console.log("reviews", reviews)



        const productMapping = await Promise.all(reviews.map(async (review) => {
            const pid = review.product_id;
            const productDetails = await getProductById(pid);
            return { ...review.toObject(), product: productDetails }
        }))

        // const productMapping2 = await Promise.all( reviews.forEach(async(review)=>{
        //     const pid = review.product_id;
        //     const productDetails =  await getProductById(pid);
        //     review.product = productDetails;
        //     // return {review:review,product:productDetails}
        // }))

        // console.log(productMapping2);




        return productMapping;

    }

    app.post('/api/reviews', createReview);
    // app.get('/api/reviews', findAllReviews);
    app.get('/api/reviews', findReviewsByID);
    // app.get('/api/reviews/:pid', findReviewsByProductId);
    app.put('/api/reviews/:rid', updateReview);
    app.delete('/api/reviews/:rid', deleteReview);

}

export default ReviewController;