import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {addCode, addUser, getAllUsers, getCode, getUser, removeCode, removeUser} from "../db/db.js";

dotenv.config();

export const sendEmail = async (req, res, next) => {
    try {
        const {email} = req.body;
        let patten=/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const isEmailValid=patten.test(email);
        if(!isEmailValid)
            return res.json({msg:"Email Incorrect",status:false})
        const emailCheck = await getUser({ email });
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false });
        const code=Math.round(Math.random()*10000);
        const mailTransport = nodemailer.createTransport({
            service: "qq",
            port: 465,
            secure: false,
            auth: {
                user: process.env.QQMAIL_USER,
                pass: process.env.QQMAIL_PASSWORD
            }
        })
        await addCode({email,code});
        setTimeout(async ()=>{
            await removeCode({email});
        },3*60*1000);
        const codeSend = await mailTransport.sendMail({
            from: `"no reply" ${process.env.QQMAIL_USER}`,
            to: email,
            subject: 'Your Verification Code',
            text: `Thank you for choosing our service.Your verification code is ${code}`,
        })
        if(!codeSend)
            return res.json({status:false,msg:"Server error: Can't send email"})
        return res.json({status: true})
    } catch (err) {
        console.log('Could not send mail: ' + err.message);
        next(err);
    }
};

export const register = async (req, res, next) => {
    try {
        const {username, email, password,code} = req.body;
        const usernameCheck = await getUser({ username });
        if (usernameCheck)
            return res.json({ msg: "Username already used", status: false });
        const emailCheck = await getUser({ email });
        if (emailCheck)
            return res.json({ msg: "Email already used", status: false });
        const {code:userCode}=await getCode({email});
        const isCodeValid=(userCode===parseInt(code));
        if(!isCodeValid){
            return res.json({msg:"Email or verification code is incorrect.",status:false});
        }
        const user = addUser({username, password,email});
        await removeCode({email});
        return res.json({status: true, user});
    } catch (err) {
        console.log('Register error: ' + err.message);
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const {password:userPassword} =await getUser({username});
        const isPasswordValid=(password===userPassword);
        if (!isPasswordValid)
            return res.json({msg: "Incorrect Username or Password", status: false});
        req.session.username = username;
        return res.json({status: true, username});
    } catch (err) {
        console.log('Login error: ' + err.message);
        next(err);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        return res.json(users);
    } catch (err) {
        console.log('Could not get user: ' + err.message);
        next(err);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const username = req.params.username;
        const user = await removeUser({username});
        return res.json({status: true, user});
    } catch (err) {
        console.log('Could not delete user: ' + err.message);
        next(err);
    }
};