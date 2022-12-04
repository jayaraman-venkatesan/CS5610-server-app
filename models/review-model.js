import mongoose from 'mongoose';
import reviewSchema from '../schemas/review-schema.js';

const reviewsModel = mongoose
    .model('ReviewModel', reviewSchema);
export default reviewsModel;
