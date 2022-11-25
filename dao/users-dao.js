import usersModel from "../models/user-model.js";

export const findUsers = () => usersModel.find();

export const findUserById = (uid) => usersModel.find({_id: uid});
