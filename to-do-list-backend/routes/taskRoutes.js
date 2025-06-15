import express from "express"
import {createTask, getTasks} from "../controllers/taskController.js"
import verifyToken from "../middlewares/auth.js";


const router = express.Router()


router.post("/" ,verifyToken ,createTask);
router.get("/",verifyToken, getTasks)

export default router;