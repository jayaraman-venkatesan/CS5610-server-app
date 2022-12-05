import * as reviewsDao from '../../dao/reviews-dao.js';

const ReviewController = (app) =>{

    const createReview = async (req, res) => {
        const newReview=req.body;
        console.log(newReview);
        const actualReview = await reviewsDao.createReview(newReview)
        res.json(actualReview)
    }
    const findAllReviews  = async (req, res) => {
        const reviews = await reviewsDao.findAllReviews()
        res.json(reviews);
    }

    const updateReview = async (req, res) => {
        const reviewIdToUpdate = req.params.rid;
        const updates = req.body;
        const status = await reviewsDao.updateReview(reviewIdToUpdate,updates)
        res.sendStatus(status);
    }
    const deleteReview = async (req, res) => {
        const reviewIdToDelete = req.params.rid;
        const status = await reviewsDao.deleteReview(reviewIdToDelete)
        res.json(status);
    }

    const findReviewsByProductId = async(req,res) =>{
        const pid = req.params.pid
        const review = await reviewsDao.findReviewsByProductId(pid)
        res.json(review)
    }

    app.post('/api/reviews', createReview);
    app.get('/api/reviews', findAllReviews);
    app.get('/api/reviews/:pid', findReviewsByProductId);
    app.put('/api/reviews/:rid', updateReview);
    app.delete('/api/reviews/:rid', deleteReview);

}

export default ReviewController;