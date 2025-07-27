// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// import React from 'react';
// import { Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import TaskForm from './components/TaskForm/TaskForm';
// const App = () => {
//   // Handle form submission
//   const handleTaskSubmit = (newTask) => {
//     console.log('New task submitted:', newTask);
//     //API
    
//   };
//   return (
//     <Container className="submit">
//       <TaskForm onTaskSubmit={handleTaskSubmit} />
//     </Container>
//   );
// };
// export default App;

import React, { useState } from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import TaskForm from './components/TaskForm/TaskForm.jsx';
import TaskTable from './components/TaskTable/TaskTable.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('form');

  const handleAddTask = (newTask) => {
    // In a real app, you'd make an API call here
    const taskWithId = {
      ...newTask,
      id: Date.now(), // Simple ID generation
      statusLabel: getStatusLabel(newTask.status, newTask.dueDate)
    };
    setTasks([...tasks, taskWithId]);
  };

  const getStatusLabel = (status, dueDate) => {
    if (status === 'completed') return 'Completed';
    if (status === 'overdue') return 'Overdue';
    
    // For pending tasks, check if they're overdue
    if (dueDate && new Date(dueDate) < new Date()) {
      return 'Overdue';
    }
    return 'Pending';
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Task Manager</h1>
      
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="form" title="Add Task">
          <TaskForm onAddTask={handleAddTask} />
        </Tab>
        <Tab eventKey="table" title="View Tasks">
          <TaskTable tasks={tasks} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default App;
