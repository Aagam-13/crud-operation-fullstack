import React from 'react';
import Table from 'react-bootstrap/Table';

const PeopleTable = ({
  currentItems,
  handleEdit,
  handleDelete,
  offset,
  isSortedAsc,
  handleSortByAge,
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ background: 'yellow' }}>ID</th>
          <th style={{ background: 'yellow' }}>First Name [Sorted]</th>
          <th style={{ background: 'yellow' }}>Last Name</th>
          <th style={{ background: 'yellow' }}>
            Age
            <button
              className="btn btn-warning"
              onClick={handleSortByAge}
              style={{ marginLeft: '5px', background: 'transparent' }}
            >
              {isSortedAsc ? '▲' : '▼'}
            </button>
          </th>
          <th style={{ background: 'yellow' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => {
            return (
              <tr key={offset + index}>
                <td>{offset + index + 1}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.age}</td>
                <td colSpan={2}>
                  <button
                    className="btn btn-success"
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5} >
              Loading......
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default PeopleTable;
