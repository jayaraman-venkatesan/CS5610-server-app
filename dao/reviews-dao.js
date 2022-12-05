import reviewsModel from "../models/review-model.js";


export const findReviewsByUserId = async (s) => await reviewsModel.find({user_id: s});

export const findAllReviews = async () => {
    const reviews = await reviewsModel.find()
    return reviews
}

export const findReviewsByProductId = async (productId) =>
    await reviewsModel.find({product_id: productId})

export const findReviewByUsername = async (user_id) =>
    await reviewsModel.findOne({user_id})

export const createReview = async (review) => {
    const actualInsertedReview = await reviewsModel.create(review)
    return actualInsertedReview
}
export const deleteReview = async (rid) => {
    const status = await reviewsModel.deleteOne({_id: rid})
    return status
}

export const updateReview = async (rid, reviewUpdates) =>
    await reviewsModel.updateOne({_id: rid},
                                    {$set: reviewUpdates})