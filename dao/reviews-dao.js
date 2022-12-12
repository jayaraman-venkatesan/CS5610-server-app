import reviewsModel from "../models/review-model.js";

export const findReviewsByUserName = async (s) => await reviewsModel.find({ user_id: s });

export const findAllReviews = async () => {
    const reviews = await reviewsModel.find()
    return reviews
}

export const findReviewsByProductId = async (productId) =>
    await reviewsModel.find({ productId })

export const findReviewsByUsername = async (userName) =>
    await reviewsModel.find({ userName })

export const createReview = async (review) => {
    const actualInsertedReview = await reviewsModel.create(review)
    return actualInsertedReview
}
export const deleteReview = async (rid) => {
    const status = await reviewsModel.deleteOne({ id: rid })
    return status
}

export const updateReview = async (rid, reviewUpdates) =>
    await reviewsModel.updateOne({ id: rid },
        { $set: reviewUpdates })