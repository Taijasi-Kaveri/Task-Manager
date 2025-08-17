
// import React from 'react';
// import { Form, Button, Card } from 'react-bootstrap';

// const TaskForm = ({ onAddTask }) => {
//   const [formData, setFormData] = React.useState({
//     title: '',
//     dueDate: '',
//     isCompleted: true,
//     status: 'pending' // Initialising status as pending
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.title) return;
//     onAddTask(formData);
//     setFormData({ title: '', dueDate: '', isCompleted: true, status: 'pending' }); // Reset form data after submission
//   };

//   return React.createElement(
//     Card,
//     { className: "mb-4" },
//     React.createElement(
//       Card.Body,
//       null,
//       React.createElement(Card.Title, null, "Add New Task"),
//       React.createElement(
//         Form,
//         { onSubmit: handleSubmit },
//         React.createElement(
//           Form.Group,
//           { className: "mb-3" },
//           React.createElement(Form.Label, null, "Title"),
//           React.createElement(Form.Control, {
//             type: "text",
//             name: "title",
//             value: formData.title,
//             onChange: handleChange,
//             required: true,
//             placeholder: "Enter task title"
//           })
//         ),
//         React.createElement(
//           Form.Group,
//           { className: "mb-3" },
//           React.createElement(Form.Label, null, "Due Date"),
//           React.createElement(Form.Control, {
//             type: "date",
//             name: "dueDate",
//             value: formData.dueDate,
//             onChange: handleChange
//           })
//         ),
//         React.createElement(
//           Form.Group,
//           { className: "mb-3" },
//           React.createElement(Form.Label, null, "Status"),
//           React.createElement(
//             Form.Select,
//             {
//               name: "status",
//               value: formData.status,
//               onChange: handleChange
//             },
//             React.createElement("option", { value: "pending" }, "Pending"),
//             React.createElement("option", { value: "overdue" }, "Overdue"),
//             React.createElement("option", { value: "completed" }, "Completed")
//           )
//         ),
//         React.createElement(
//           Button,
//           { variant: "primary", type: "submit" },
//           "Add Task"
//         )
//       )
//     )
//   );
// };

// export default TaskForm;

// 
// import React from 'react';
// import { Form, Button, Card } from 'react-bootstrap';

// const TaskForm = ({ onAddTask }) => {
//   const [formData, setFormData] = React.useState({
//     title: '',
//     dueDate: '',
//     status: 'pending'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.title) return;
    
//     onAddTask({
//       ...formData,
//       id: Date.now() // Temporary ID
//     });
    
//     setFormData({ title: '', dueDate: '', status: 'pending' });
//   };

//   return (
//     <Card className="mb-4">
//       <Card.Body>
//         <Card.Title>Add New Task</Card.Title>
//         <Form onSubmit={handleSubmit}>
//           {/* Existing form fields remain the same */}
//         </Form>
//       </Card.Body>
//     </Card>
//   );
// };

// export default TaskForm;

import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const TaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    dueDate: '',
    status: 'pending'  // Default status
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;
    
    const newTask = {
      ...formData,
      id: Date.now(),  // Generate a simple ID
      createdAt: new Date().toISOString()
    };
    
    onAddTask(newTask);
    setFormData({ title: '', dueDate: '', status: 'pending' });  // Reset form
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-4">Add New Task</Card.Title>
        
        <Form onSubmit={handleSubmit}>
          {/* Title Field */}
          <Form.Group className="mb-3">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </Form.Group>

          {/* Due Date Field */}
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Status Dropdown */}
          <Form.Group className="mb-4">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </Form.Select>
          </Form.Group>

          {/* Submit Button */}
          <div className="d-grid">
            <Button 
              variant="primary" 
              type="submit"
              size="lg"
            >
              Add Task
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default TaskForm;
// This code defines a TaskForm component that allows users to add new tasks with a title, due date, and status.
