// AdminLoginModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const AdminLoginModal = ({ show, handleClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Reset form fields when modal is closed
  useEffect(() => {
    if (!show) {
      setUsername('');
      setPassword('');
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcoded credentials for demo purposes
    const adminUsername = 'admin';
    const adminPassword = '123';

    if (username === adminUsername && password === adminPassword) {
      onLogin();
      handleClose(); // Close modal after successful login
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Admin Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button variant="primary" type="submit" className="mt-3">
            Login
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AdminLoginModal;
