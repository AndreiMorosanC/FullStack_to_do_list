import { useState } from "react";
import { auth } from "../../firebase";
import { getIdToken } from "firebase/auth";

const useTask = () => {
  const [loading, setLoading] = useState(false);

  const createTask = async (task) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Usuario no autenticado");
      return;
    }

    const token = await getIdToken(user);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "No se pudo crear la tarea");
      return data;
    } catch (err) {
      console.error("❌ Error al crear tarea:", err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getTasks = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/task", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("No se pudieron obtener las tareas");
      const tasks = await res.json();
      return tasks
    } catch (err) {
      console.error("❌ Error al obtener tareas:", err.message);
      return [];
    }
  };

  return { createTask, getTasks, loading };
};

export default useTask;
