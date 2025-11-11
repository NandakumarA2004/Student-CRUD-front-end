import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getStudents, createStudent, deleteStudent, updateStudent } from '../api/Config';

const Students = () => {
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [Data, setData] = useState([]);
  const [input, setInput] = useState({
    name: "",
    course: "",
    marks: ""
  });
  const [editInput, setEditInput] = useState({
    name: "",
    course: "",
    marks: ""
  });
  const [editItem, setEditItem] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (item) => {
    setEditItem(item);
    setEditInput({
      name: item.name,
      course: item.course,
      marks: item.marks
    });
    setEditShow(true);
  };

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    let result = await getStudents();
    setData(result.data);
  };


  const handleAdd = async () => {
    await createStudent(input);
    getAllData(); 
    setInput({ name: "", course: "", marks: "" });
    handleClose();
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    getAllData();
  };

  const handleUpdate = async () => {
    await updateStudent(editItem.id, editInput);
    getAllData();
    handleEditClose();
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <h3 className="navbar-brand ms-5">Student Management System</h3>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold text-secondary mb-0">User List</h4>
              <button onClick={handleShow} className="btn btn-primary px-4 rounded-pill">
                + Add More
              </button>
            </div>

            <table className="table table-striped table-hover align-middle text-center">
              <thead className="table-primary">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Course</th>
                  <th scope="col">Marks</th>
                  <th scope="col">Operation</th>
                </tr>
              </thead>
              <tbody>
                {
                  Data.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.course}</td>
                      <td>{item.marks}</td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-success me-2"
                          onClick={() => handleEditShow(item)}
                        >
                          <i className="bi bi-pencil-square"></i> Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input 
            placeholder='Name' 
            className='form-control mb-2'
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
          <input 
            placeholder='Course' 
            className='form-control mb-2'
            value={input.course}
            onChange={(e) => setInput({ ...input, course: e.target.value })}
          />
          <input 
            placeholder='Marks' 
            className='form-control mb-2'
            value={input.marks}
            onChange={(e) => setInput({ ...input, marks: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input 
            placeholder='Name' 
            className='form-control mb-2'
            value={editInput.name}
            onChange={(e) => setEditInput({ ...editInput, name: e.target.value })}
          />
          <input 
            placeholder='Course' 
            className='form-control mb-2'
            value={editInput.course}
            onChange={(e) => setEditInput({ ...editInput, course: e.target.value })}
          />
          <input 
            placeholder='Marks' 
            className='form-control mb-2'
            value={editInput.marks}
            onChange={(e) => setEditInput({ ...editInput, marks: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Students;
