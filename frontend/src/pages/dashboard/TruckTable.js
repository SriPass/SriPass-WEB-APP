import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, TablePagination, TextField, InputAdornment, Link } from '@mui/material';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { Link as RouterLink } from 'react-router-dom';

function TruckTable() {
  const [truckData, setTruckData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMode, setEditMode] = useState({});

  const key = 'updatable';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/truck/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setTruckData(data);
      } catch (error) {
        console.error('Error fetching truck data:', error);
      }
    };
    fetchData();
  }, []);

  const updateTruckData = async (rowId, updatedData) => {
    try {
      const response = await fetch(`http://15.156.146.25:8070/api/truck/update/${rowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      //message
      message.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });
      setTimeout(() => {
        message.open({
          key,
          type: 'success',
          content: `Update successfully`,
          duration: 2,
        });
      }, 1000);
      message.config({
        top: 100,
        duration: 2,
        maxCount: 4,
        rtl: true,
        prefixCls: 'my-message',
      });

      // You might want to update your local data or refetch here
    } catch (error) {
      console.error('Error updating truck data:', error);

      //message
      message.open({
        key,
        type: 'loading',
        content: 'Loading...',
      });
      setTimeout(() => {
        message.open({
          key,
          type: 'error',
          content: `Error`,
          duration: 2,
        });
      }, 1000);
      message.config({
        top: 100,
        duration: 2,
        maxCount: 4,
        rtl: true,
        prefixCls: 'my-message',
      });
    }
  };

  const toggleEditMode = (rowId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [rowId]: !prevEditMode[rowId]
    }));
  };

  const handleEditFieldChange = (rowId, fieldId, value) => {
    const updatedData = truckData.map((row) =>
      row.truck_no === rowId ? { ...row, [fieldId]: value } : row
    );
    setTruckData(updatedData);
  };

  const handleSaveEdit = async (rowId) => {
    const editedRow = truckData.find((row) => row.truck_no === rowId);

    if (editedRow) {
      // Replace 'newValue' with the actual value from the input field for truck_no
      const newValue = editedRow.truck_no;
      editedRow.truck_no = newValue; // Update the 'truck_no' field with the new value

      await updateTruckData(rowId, editedRow);
      toggleEditMode(rowId);
    }
  };

  const filteredTruckData = truckData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headCells = [
    { id: 'truck_no', label: 'Truck No' },
    { id: 'type', label: 'Type' },
    { id: 'license_plate', label: 'License Plate' },
    { id: 'plate_expiry', label: 'Plate Expiry' },
    { id: 'annual_safety_expiry', label: 'Annual Safety Expiry' },
    { id: 'actions', label: 'Actions' }, // New column for edit actions
  ];

  return (
    <Box>
      {/* Search and Add Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <Link component={RouterLink} to="/addtruck">
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
        </Link>
      </div>

      {/* Table */}
      <TableContainer>
        <Table aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell key={headCell.id} align="left">
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTruckData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.truck_no}
              >
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align="left">
                    {headCell.id === 'actions' ? (
                      editMode[row.truck_no] ? (
                        <>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => handleSaveEdit(row.truck_no)}
                          >
                            Save
                          </Button>
                          
                        </>
                      ) : (
                        <Button
                          type="link"
                          size="small"
                          onClick={() => toggleEditMode(row.truck_no)}
                        >
                          Edit
                        </Button>
                      )
                    ) : headCell.id === 'truck_no' ? (
                      // Display the truck_no value without the edit button
                      row[headCell.id]
                    ) : editMode[row.truck_no] ? (
                      <TextField
                        value={row[headCell.id]}
                        onChange={(e) => handleEditFieldChange(row.truck_no, headCell.id, e.target.value)}
                      />
                    ) : (
                      row[headCell.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredTruckData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default TruckTable;
