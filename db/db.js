import User from "./userModel.js"
import Code from "./codeModel.js"

export const getUser = async (options = {}) => {
    return User.findOne(options);
}

export const getAllUsers = async () => {
    return User.find();
}

export const addUser = async (options = {}) => {
    return User.create(options);
}

export const removeUser = async (options = {}) => {
    return User.findOneAndDelete(options);
}

export const addCode=async (options={})=>{
    return Code.create(options);
}

export const removeCode = async (options = {}) => {
    return Code.findOneAndDelete(options);
}

export const getCode = async (options = {}) => {
    return Code.findOne(options);
}

