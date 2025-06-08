import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const task = {
    title:"prueba de funcionamiento de la base de datos y envio de datos",
    done: true,
  }
    
  const createTask = async (task) => {
    try {
      const res = await fetch("http://localhost:3001/api/task", {
        method: "POST",
        headers: {
      'Content-Type': 'application/json',
    },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "No se pudo crear la tarea");
      return data;
    } catch (err) {
      console.error("❌ Error al crear tarea:", err.message);
      return null;
    }
  };


    createTask(task)
    console.log(task)


  return (
      <div>
        <h1>prueba</h1>
      </div>
  )
}

export default App
