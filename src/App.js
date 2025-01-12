import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]); // State for tasks
  const [error, setError] = useState(null); // State for error message

  // Function to fetch data from Firebase
  const fetchData = () => {
    axios
      .get('https://debugging-axios-integration-default-rtdb.firebaseio.com/tasks.json') // Use correct URL
      .then((response) => {
        const taskData = response.data;
        
        if (taskData) {
          const parsedTasks = Object.keys(taskData).map((key) => ({
            id: key,
            name: taskData[key].name,
          }));
          setTasks(parsedTasks);
        } else {
          setTasks([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        setError("Failed to load tasks, please try again later.");
      });
  };
  

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs only once, like componentDidMount

  return (
    <div className="App">
      <h1>Task List</h1>

      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li> // Use the 'id' as a unique key for each task
        ))}
      </ul>
    </div>
  );
}

export default App;


