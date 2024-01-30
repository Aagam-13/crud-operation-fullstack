import React, { useState, useEffect, Fragment } from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import './App.css';
import PeopleTable from './PeopleTable';
import PeopleModal from './PeopleModal';
import {
  validateFirstName,
  validateLastName,
  validateAge,
} from './InputValidation';
import { getPeople, getPersonById, addPerson, updatePerson, deletePerson } from './apiService'; 

const PeopleUI = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Add new form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [searchLastName, setSearchLastName] = useState('');
  const [searchName, setSearchName] = useState('');
  const [isSortedAsc, setIsSortedAsc] = useState(true);
  const [getById, setGetById] = useState('');
  const [getByIdData, setGetByIdData] = useState(null);


  const itemsPerPage = 7;
  const offset = currentPage * itemsPerPage;

  // Edit form
  const [editId, setEditId] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editAge, setEditAge] = useState('');

  // Function to handle page change
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleLastNameSearchChange = (e) => {
    setSearchLastName(e.target.value);
  };

  const renderPageButtons = () => {
    const pageCount = Math.ceil(data.length / itemsPerPage);
    const pageButtons = [];
    for (let i = 0; i < pageCount; i++) {
      pageButtons.push(
        <Button
          key={i}
          variant={i === currentPage ? 'warning' : 'secondary'}
          onClick={() => setCurrentPage(i)}
        >
          {i + 1}
        </Button>
      );
    }
    return pageButtons;
  };

  const handleSortByAge = () => {
    setIsSortedAsc(!isSortedAsc);
    const sortedData = [...data].sort((a, b) => {
      if (isSortedAsc) {
        return a.age - b.age;
      } else {
        return b.age - a.age;
      }
    });
    setData(sortedData);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    // Update currentItems whenever data or currentPage changes
    const currentItems = data.slice(offset, offset + itemsPerPage);
    setCurrentItems(currentItems);
  }, [data, currentPage, offset]);

  useEffect(() => {
    // Update currentItems whenever data, currentPage, or searchName changes
    const filteredData = data.filter(
      (person) =>
        person?.firstName.toLowerCase().includes(searchName.toLowerCase()) &&
        person?.lastName.toLowerCase().includes(searchLastName.toLowerCase())
    );
    const currentItems = filteredData.slice(offset, offset + itemsPerPage);
    setCurrentItems(currentItems);
  }, [data, currentPage, offset, searchName, searchLastName]);

  const getData = () => {
    getPeople()
      .then((result) => {
        const sortedData = result.data?.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );
        setData(sortedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Edit
  const handleEdit = (id) => {
    handleShow();
    getPersonById(id)
      .then((result) => {
        setEditFirstName(result.data.firstName);
        setEditLastName(result.data.lastName);
        setEditAge(result.data.age);
        setEditId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm('This person is gonna be delete') === true) {
      deletePerson(id)
        .then((result) => {
          if (result.status === 204) {
            toast.success('People have been deleted');
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleGetById = () => {
    getPersonById(getById)
      .then((result) => {
        setGetByIdData(result.data);
      })
      .catch((error) => {
        console.log(error);
        setGetByIdData(null);
      });
  };

  // Updation
  const handleUpdate = () => {
    const data = {
      id: editId,
      firstName: editFirstName,
      lastName: editLastName,
      age: editAge,
    };
    updatePerson(editId, data)
    .then((result) => {
      getData();
        clear();
        toast.success('People has been updated');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  // Clear data
  const clear = () => {
    setFirstName('');
    setLastName('');
    setAge('');
    setEditFirstName('');
    setEditLastName('');
    setEditAge('');
  };

  const validateInput = () => {
    let isValid = true;
    
    const firstNameError = validateFirstName(firstName);
    const lastNameError = validateLastName(lastName);
    const ageError = validateAge(age);

    if (firstNameError) {
      setFirstNameError(firstNameError);
      isValid = false;
    } else {
      setFirstNameError('');
    }

    if (lastNameError) {
      setLastNameError(lastNameError);
      isValid = false;
    } else {
      setLastNameError('');
    }

    if (ageError) {
      setAgeError(ageError);
      isValid = false;
    } else {
      setAgeError('');
    }

    return isValid;
  };
  // Save
  const handleSave = () => {
    if (!validateInput()) {
      return;
    }

    const data = {
      FirstName: firstName,
      LastName: lastName,
      age: age,
    };
    addPerson(data)
      .then((result) => {
        getData();
        clear();
        toast.success('People has been added');
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  // Striped bordered hover=lines & grey and white row
  return (
    <>
      <ToastContainer />
      <Container >
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {firstNameError && (
              <div className="error-message">
                {firstNameError}
              </div>
            )}
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {lastNameError && (
              <div className="error-message">
                {lastNameError}
              </div>
            )}
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            {ageError && (
              <div className="error-message">
                {ageError}
              </div>
            )}
          </Col>
          <Col>
            <Button
              variant="outline-warning"
              className="btn btn submit"
              onClick={() => handleSave()}
            >
              Submit
            </Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter ID for Get by ID"
              value={getById}
              onChange={(e) => setGetById(e.target.value)}
            />
          </Col>
          <Col>
            <Button
              variant="outline-warning"
              onClick={handleGetById}
            >
              Get by ID
            </Button>
          </Col>
        </Row>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {getByIdData && (
              <tr>
                <td>{getByIdData.id}</td>
                <td>{getByIdData.firstName}</td>
                <td>{getByIdData.lastName}</td>
                <td>{getByIdData.age}</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Row className="mt-4">
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Search by FirstName"
              value={searchName}
              onChange={handleSearchChange}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Search by LastName"
              value={searchLastName}
              onChange={handleLastNameSearchChange}
            />
          </Col>
        </Row>
      </Container>

      <br />
      <PeopleTable
        currentItems={currentItems}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        offset={offset}
        isSortedAsc={isSortedAsc}
        handleSortByAge={handleSortByAge}
        currentPage={currentPage}
        renderPageButtons={renderPageButtons}
        handlePageChange={handlePageChange}
      />
       <PeopleModal
        show={show}
        handleClose={handleClose}
        editFirstName={editFirstName}
        setEditFirstName={setEditFirstName}
        editLastName={editLastName}
        setEditLastName={setEditLastName}
        editAge={editAge}
        setEditAge={setEditAge}
        handleUpdate={handleUpdate}
      />

      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        breakLabel={'...'}
        breakClassName={'break-me'}
        //pageCount={Math.ceil(data.length / itemsPerPage)}
        marginPagesDisplayed={4}
        pageRangeDisplayed={8}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        initialPage={currentPage}
      />
      <div className="pagination-buttons">
        {renderPageButtons()}
      </div>
    </>
  );
};

export default PeopleUI;