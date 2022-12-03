import usersModel from "../models/user-model.js";

export const findUsers = () => usersModel.find();

export const findUserById = (uid) => usersModel.find({_id: uid});

export const findByUsername = (userName) =>
    usersModel.find({userName:userName});

export const findByCredentials = (userName, password) =>

     usersModel.findOne(
        {userName, password},
        {password: false});



export const createUser = (user) =>{
    console.log("in dao")
    console.log(user)
    usersModel.create(user);
    console.log("exiting dao")
}


