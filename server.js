import express from 'express';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import cors from "cors";
import {deleteUser, getAllUsers, login, register} from "./controllers/controller.js";
import dotenv from "dotenv";

dotenv.config();

import './connection.js';

const port = process.env.PORT || 3000;

const app = express();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cors());

app.get("/api/list", getAllUsers);
app.delete("/api/delete/:id",deleteUser);
app.post("/api/register", register);
app.post("/api/login", login);

app.listen(port, () => {
    console.log(`Server started on ${port}`)
});