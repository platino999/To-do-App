import { useState } from "react";

interface Task {
  text: string;
  completed: boolean;
}

const ToDoList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const addTask = () => {
    const inputElement = document.getElementById(
      "toDoInput"
    ) as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.trim() !== "") {
      const formattedTask = capitalizeFirstLetter(inputValue);

      const isDuplicate = tasks.some(
        (t) => t.text.toLowerCase() === formattedTask.toLowerCase()
      );

      if (!isDuplicate) {
        setTasks((prevTasks) => [
          ...prevTasks,
          { text: formattedTask, completed: false },
        ]);
      } else {
        alert("Task already exists!");
      }
    }

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

  return (
    <>
      <div className="To-Do-Container">
        <div className="ParentContainer">
          <h1 className="ToDoHeading">To-Do List App</h1>
          <div className="InputandButton">
            <input
              type="text"
              name="toDoInput"
              id="toDoInput"
              placeholder="Add a new task"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTask();
                }
              }}
            />
            <button type="button" className="ToDoButton" onClick={addTask}>
              Add
            </button>
          </div>

          <ul>
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
                  id="Check-box"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ToDoList;
