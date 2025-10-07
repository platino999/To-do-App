import { useState, useEffect } from "react";

interface Task {
  text: string;
  completed: boolean;
}

const ToDoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Load saved tasks from localStorage on mount
    const saved = localStorage.getItem("Saved");
    console.log("Loaded from localStorage:", saved);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Task[];
        setTasks(parsed);
      } catch (e) {
        console.error("Failed to parse saved tasks:", e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("Saved", JSON.stringify(tasks));
      console.log("Saved to localStorage:", tasks);
    }
  }, [tasks, isInitialized]);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const addTask = () => {
    const inputElement = document.getElementById(
      "toDoInput"
    ) as HTMLInputElement;
    const inputValue = inputElement.value.trim();

    if (inputValue === "") return;

    const formattedTask = capitalizeFirstLetter(inputValue);

    const isDuplicate = tasks.some(
      (t) => t.text.toLowerCase() === formattedTask.toLowerCase()
    );

    if (isDuplicate) {
      alert("Task already exists!");
      inputElement.value = "";
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      { text: formattedTask, completed: false },
    ]);

    inputElement.value = "";
  };

  const toggleTaskCompletion = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  // 3. Finally, the JSX UI

  return (
    <div className="To-Do-Container">
      <div className="ParentContainer">
        <h1 className="ToDoHeading">To-Do List App</h1>
        <div className="InputandButton">
          <input
            type="text"
            id="toDoInput"
            placeholder="Add a new task"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <button className="ToDoButton" onClick={addTask}>
            Add
          </button>
        </div>

        <ul id="ParentUnordered">
          {tasks.map((task, index) => (
            <li key={index} className="TaskAdded">
              <span
                style={{
                  marginLeft: "8px",
                  textDecoration: task.completed ? "line-through" : "none",
                  textDecorationColor: task.completed ? "black" : "inherit",
                }}
              >
                {task.text}
              </span>
              <button
                className="Delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <input
                type="checkbox"
                id="Check-box"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
