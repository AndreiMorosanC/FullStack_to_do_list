import { useState, useEffect } from "react";
import { auth } from "../../../firebase";

const GetStak = () => {
  const [taskList, setTaskList] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const token = await auth.currentUser?.getIdToken(); // si usas firebase auth directamente

      fetch("http://localhost:3001/api/task", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setTaskList(data))
        .catch((error) => console.error("Error al cargar tasks:", error));
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <ul>
        {taskList.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <input type="checkbox" checked={task.done} readOnly />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetStak;
