import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
    },
    code: {
        type: Number,
        required: true,
    },
});

export default mongoose.model("Code", codeSchema);
