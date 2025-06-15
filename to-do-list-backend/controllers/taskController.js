import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, done } = req.body;
    const { uid } = req.firebaseUser;

    if (!title || typeof done !== "boolean") {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const newTask = new Task({
      title,
      done,
      userId: uid,
    });
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("❌ Error creando tarea:", error.message || error);
    res.status(500).json({ error: error.message || "error creating task" });
  }
};


export const getTasks = async (req, res) => {
  try {
    const { uid } = req.firebaseUser;

    const tasks = await Task.find({ userId: uid }); 

    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ Error obteniendo tareas:", error.message);
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};


