import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css'; // Import your App.css file

const PeopleModal = ({
  show,
  handleClose,
  editFirstName,
  setEditFirstName,
  editLastName,
  setEditLastName,
  editAge,
  setEditAge,
  handleUpdate,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm People Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control modal-input"
              placeholder="First Name"
              value={editFirstName}
              onChange={(e) => setEditFirstName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control modal-input modal-input-blue"
              placeholder="Last Name"
              value={editLastName}
              onChange={(e) => setEditLastName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="number"
              className="form-control modal-input modal-input-blue"
              placeholder="Enter Age"
              value={editAge}
              onChange={(e) => setEditAge(e.target.value)}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className="modal-button-red">
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate} className="modal-button-green">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PeopleModal;
