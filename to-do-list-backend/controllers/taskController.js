import Task from "../models/Task.js";



export const createTask = async(req,res)=>{
    try{
        const {
            title,
            done,
        }= req.body

        if(!title || !done){
            return res.status(400).json({ error: "Faltan campos obligatorios" });
        }

        const newTask = new Task({
            title,
            done,
        })
        const savedTask = await newTask.save();

        res.status(201).json(savedTask);

    }catch(error){
        console.error("❌ Error creando tarea:", error.message || error);
        res.status(500).json({ error: error.message || "error creating task" });
    }
};



