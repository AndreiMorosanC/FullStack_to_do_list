import { type } from "@testing-library/user-event/dist/cjs/utility/type.js";
import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {type: String, required:true},
        done : {type:Boolean, required:true},
    },
    { timestamps: true }
)
export default mongoose.model("Task", taskSchema);