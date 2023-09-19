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

function CustomerRateTable() {
  const [customerRateData, setCustomerRateData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMode, setEditMode] = useState({});
  const [editedFields, setEditedFields] = useState({});
  const [carrierRateOptions, setCarrierRateOptions] = useState({});
  const key = 'updatable';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/customerrate/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setCustomerRateData(data);
      } catch (error) {
        console.error('Error fetching customer rate data:', error);
      }
    };
    fetchData();

    const fetchCarrierRateData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/carrierrate/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();

        // Create carrier rate options for Autocomplete
        const options = {};
        data.forEach((carrierRate) => {
          options[carrierRate.carrier_rate_id] = carrierRate;
        });
        setCarrierRateOptions(options);
      } catch (error) {
        console.error('Error fetching carrier rate data:', error);
      }
    };
    fetchCarrierRateData();
  }, []);

  const toggleEditMode = (rowId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [rowId]: !prevEditMode[rowId],
    }));
  };

  const handleEditFieldChange = (rowId, fieldId, value) => {
    // Update the edited fields object, including empty values
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [rowId]: {
        ...prevEditedFields[rowId],
        [fieldId]: value,
      },
    }));
  };

  const handleSaveEdit = async (rowId) => {
    const editedRow = customerRateData.find((row) => row.customer_rate_id === rowId);

    if (editedRow) {
      try {
        const updatedRow = { ...editedRow, ...editedFields[rowId] };

        const response = await fetch(`http://15.156.146.25:8070/api/customerrate/update/${rowId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRow),
        });

        if (!response.ok) {
          throw new Error('Failed to update data');
        }

        setCustomerRateData((prevCustomerRateData) => {
          const updatedData = prevCustomerRateData.map((data) =>
            data.customer_rate_id === rowId ? updatedRow : data
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

        toggleEditMode(rowId);
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

  const filteredCustomerRateData = customerRateData.filter((row) =>
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
    { id: 'customer_rate_id', label: 'Customer Rate ID' },
    { id: 'customer_rate', label: 'Customer Rate' },
    { id: 'other_chargers', label: 'Other Charges' },
    { id: 'chargers_advances', label: 'Charges Advances' },
    { id: 'status', label: 'Status' },
    { id: 'carrier_rate_id', label: 'Carrier Rate ID' },
    { id: 'actions', label: 'Actions' }, // Add the Actions column
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
        <Link component={RouterLink} to="/addcustomerrate">
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
            {filteredCustomerRateData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.customer_rate_id}
              >
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align="left">
                    {headCell.id === 'actions' ? (
                      editMode[row.customer_rate_id] ? (
                        <>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => handleSaveEdit(row.customer_rate_id)}
                          >
                            Save
                          </Button>
                          {/* <Button
                            type="link"
                            size="small"
                            onClick={() => toggleEditMode(row.customer_rate_id)}
                          >
                            Cancel
                          </Button> */}
                        </>
                      ) : (
                        <Button
                          type="link"
                          size="small"
                          onClick={() => toggleEditMode(row.customer_rate_id)}
                        >
                          Edit
                        </Button>
                      )
                    ) : headCell.id === 'carrier_rate_id' ? (
                      <span style={{ color: 'gray' }}>
                        {editMode[row.customer_rate_id] ? (
                          // Inside the Autocomplete component for carrier_rate_id
                          <Autocomplete
                            value={
                              editedFields[row.customer_rate_id]?.carrier_rate_id !== undefined
                                ? { carrier_rate_id: editedFields[row.customer_rate_id]?.carrier_rate_id }
                                : { carrier_rate_id: row.carrier_rate_id }
                            }
                            onChange={(event, newValue) => {
                              handleEditFieldChange(row.customer_rate_id, 'carrier_rate_id', newValue?.carrier_rate_id || '');
                            }}
                            options={Object.values(carrierRateOptions)}
                            getOptionLabel={(option) => option.carrier_rate_id}
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
                    ) : headCell.id === 'customer_rate_id' ? (
                      // Display the customer_rate_id without an input field
                      row.customer_rate_id
                    ) : (
                      editMode[row.customer_rate_id] ? (
                        <TextField
                          value={editedFields[row.customer_rate_id]?.[headCell.id] || row[headCell.id]}
                          onChange={(e) => handleEditFieldChange(row.customer_rate_id, headCell.id, e.target.value)}
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

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredCustomerRateData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default CustomerRateTable;
