import usersModel from "../models/user-model.js";

export const findUsers = () => usersModel.find();

export const findUserById = (uid) => usersModel.findOne({ _id: uid });

export const findByUsername = (userName) =>
    usersModel.findOne({ userName: userName });

export const findByCredentials = (userName, password) => {
    console.log("in dao")
    const currentUser = usersModel.find(
        { userName: userName, password: password },
        { password: false });
    return currentUser

}
export const createUser = (user) => {
    console.log("in create dao")
    console.log(user)
    const currentUser = usersModel.create(user);
    return currentUser
    console.log("exiting create user dao")
}

export const updateProfile = (id, user) => {
    const currentUser = usersModel.updateOne({ _id: id }, { $set: user });
    return currentUser
}

