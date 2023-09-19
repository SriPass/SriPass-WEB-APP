import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TablePagination,
  TextField,
  InputAdornment,
  Link,
} from '@mui/material';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { Link as RouterLink } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete'; // Import Autocomplete

function CustomerTable() {
  const [customerData, setCustomerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMode, setEditMode] = useState({});
  const [editedFields, setEditedFields] = useState({});
  const [loadData, setLoadData] = useState([]); // State to store load data

  const key = 'updatable';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/customer/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchData();

    // Fetch load data
    const fetchLoadData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/load/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setLoadData(data);
      } catch (error) {
        console.error('Error fetching load data:', error);
      }
    };
    fetchLoadData();
  }, []);

  const toggleEditMode = (customerId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [customerId]: !prevEditMode[customerId],
    }));
  };

  const handleEditFieldChange = (customerId, fieldId, value) => {
    if (fieldId === 'customer_id') {
      return; // Do nothing, don't allow editing of "customer_id"
    }
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [customerId]: {
        ...prevEditedFields[customerId],
        [fieldId]: value,
      },
    }));
  };

  const handleSaveEdit = async (customerId) => {
    const editedCustomer = customerData.find((customer) => customer.customer_id === customerId);

    if (editedCustomer) {
      try {
        const updatedCustomer = { ...editedCustomer, ...editedFields[customerId] };

        const response = await fetch(`http://15.156.146.25:8070/api/customer/update/${customerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedCustomer),
        });

        if (!response.ok) {
          throw new Error('Failed to update data');
        }

        // Update customerData state with the edited customer
        setCustomerData((prevCustomerData) => {
          const updatedData = prevCustomerData.map((data) =>
            data.customer_id === customerId ? updatedCustomer : data
          );
          return updatedData;
        });

        message.open({
          key,
          type: 'loading',
          content: 'Loading...',
        });
        setTimeout(() => {
          message.open({
            key,
            type: 'success',
            content: `Update successful`,
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

        toggleEditMode(customerId);
      } catch (error) {
        message.open({
          key,
          type: 'loading',
          content: 'Loading...',
        });
        setTimeout(() => {
          message.open({
            key,
            type: 'error',
            content: `Error updating data`,
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
    }
  };

  const filteredCustomerData = customerData.filter((row) =>
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
    { id: 'customer_id', label: 'Customer ID' },
    { id: 'name', label: 'Name' },
    { id: 'address', label: 'Address' },
    { id: 'country', label: 'Country' },
    { id: 'state_province', label: 'State Province' },
    { id: 'postal_zip', label: 'Postal Zip' },
    { id: 'load_no', label: 'Load No' }, // Add this line
    { id: 'actions', label: 'Actions' },
  ];

  return (
    <Box>
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
        <Link component={RouterLink} to="/addcustomer">
          <Button type="primary" shape="circle" icon={<PlusOutlined />} />
        </Link>
      </div>

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
            {filteredCustomerData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.customer_id}
              >
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align="left">
                    {headCell.id === 'actions' ? (
                      editMode[row.customer_id] ? (
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => handleSaveEdit(row.customer_id)}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          type="link"
                          size="small"
                          onClick={() => toggleEditMode(row.customer_id)}
                        >
                          Edit
                        </Button>
                      )
                    ) : headCell.id === 'customer_id' ? (
                      // Display the customer_id value without the edit button
                      row[headCell.id]
                    ) : headCell.id === 'load_no' ? (
                      <span style={{ color: 'gray' }}>
                        {editMode[row.customer_id] ? (
                          // Inside the Autocomplete component for load_no
                          <Autocomplete
                            value={
                              editedFields[row.customer_id]?.load_no !== undefined
                                ? { load_no: editedFields[row.customer_id]?.load_no }
                                : { load_no: row.load_no }
                            }
                            onChange={(event, newValue) => {
                              handleEditFieldChange(row.customer_id, 'load_no', newValue?.load_no || '');
                            }}
                            options={loadData.map((load) => ({ load_no: load.load_no }))}
                            getOptionLabel={(option) => option.load_no}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: null, // Remove both the search icon and clear button
                                }}
                              />
                            )}
                          />
                        ) : (
                          row[headCell.id]
                        )}
                      </span>
                    ) : (
                      editMode[row.customer_id] ? (
                        <TextField
                          value={editedFields[row.customer_id]?.[headCell.id] || row[headCell.id]}
                          onChange={(e) => handleEditFieldChange(row.customer_id, headCell.id, e.target.value)}
                        />
                      ) : (
                        row[headCell.id]
                      )
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredCustomerData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default CustomerTable;
