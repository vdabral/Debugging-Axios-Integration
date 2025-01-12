import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]); // State for tasks
  const [error, setError] = useState(null); // State for error message

  // Function to fetch data from Firebase
  const fetchData = () => {
    axios
      .get("https://console.firebase.google.com/u/0/project/debugging-axios-integration/database/debugging-axios-integration-default-rtdb/data/~2F?fb_gclid=CjwKCAiA7Y28BhAnEiwAAdOJUHIAgN85rmlzD6j3ROlnR6-S0pmxFxbZjQEvdmDYYdogSB5XU9M8BRoCFa0QAvD_BwE") // Replace with your Firebase URL
      .then((response) => {
        const taskData = response.data;
        
        // Check if taskData exists, then format it as an array
        if (taskData) {
          const parsedTasks = Object.keys(taskData).map((key) => ({
            id: key,
            name: taskData[key].name, // Assuming each task has a 'name' property
          }));
          setTasks(parsedTasks); // Set the tasks in the state
        } else {
          setTasks([]); // Set an empty array if no data is found
        }
      })
      .catch((error) => {
        console.log("Error fetching tasks:", error);
        setError("Failed to load tasks, please try again later."); // Set error message
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


