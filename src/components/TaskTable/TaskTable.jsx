import React from 'react';
import { Table } from 'react-bootstrap';

const TaskTable = ({ tasks }) => {
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  // Determine status badge style
  const getStatusBadge = (status) => {
    const variant = {
      pending: 'warning',
      overdue: 'danger',
      completed: 'success'
    }[status];
    
    return (
      <span className={`badge bg-${variant}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="mt-4">
      <h4>Task List</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{formatDate(task.dueDate)}</td>
              <td>{getStatusBadge(task.status)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TaskTable;

