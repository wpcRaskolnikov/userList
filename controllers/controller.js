import User from "../userModel.js"
import url from 'node:url';

export const register = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const usernameCheck = await User.findOne({username});
        if (usernameCheck)
            return res.json({msg: "Username already used", status: false});
        const user = await User.create({
            username, password
        });
        return res.json({status: true, user});
    } catch (ex) {
        next(ex);
    }
};

export const login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if (!user)
            return res.json({msg: "Incorrect Username or Password", status: false});
        if (!isPasswordValid)
            return res.json({msg: "Incorrect Username or Password", status: false});
        delete user.password;
        return res.json({status: true, user});
    } catch (ex) {
        next(ex);
    }
};

export const getAllUsers = async (req, res, next) => {
    try {
        let users = await User.find();
        return res.json(users);
    } catch (ex) {
        next(ex);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const username = req.params.id;
        let user = await User.findOneAndDelete({username});
        return res.json({status: true, user});
    } catch (ex) {
        next(ex);
    }
};