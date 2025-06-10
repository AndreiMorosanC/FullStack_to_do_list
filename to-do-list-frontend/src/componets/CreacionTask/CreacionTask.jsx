import { useState } from "react";
import useTask from "../../hooks/UseTask";
const CreacionTask = () => {
  const { createTask, loading } = useTask();
  const [task, setTask] = useState("");

  const handleSubmit = async () => {
  if (!task.trim()) return; 
  await createTask({ title: task.trim(), done: false });
  setTask("");
};


  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <button onClick={handleSubmit}>add Task</button>
    </div>
  );
};

export default CreacionTask;
