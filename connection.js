import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/playground')
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));