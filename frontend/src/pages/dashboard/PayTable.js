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

function PayTable() {
  const [paymentData, setPaymentData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMode, setEditMode] = useState({});
  const [editedFields, setEditedFields] = useState({});
  const [driverOptions, setDriverOptions] = useState({});
  const key = 'updatable';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/pay/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setPaymentData(data);
      } catch (error) {
        console.error('Error fetching payment data:', error);
      }
    };
    fetchData();

    const fetchDriverData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/driver/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();

        // Create driver options for Autocomplete
        const options = {};
        data.forEach((driver) => {
          options[driver.driver_id] = driver;
        });
        setDriverOptions(options);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };
    fetchDriverData();
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
    const editedRow = paymentData.find((row) => row.pay_id === rowId);

    if (editedRow) {
      try {
        const updatedRow = { ...editedRow, ...editedFields[rowId] };

        const response = await fetch(`http://15.156.146.25:8070/api/pay/update/${rowId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRow),
        });

        if (!response.ok) {
          throw new Error('Failed to update data');
        }

        setPaymentData((prevPaymentData) => {
          const updatedData = prevPaymentData.map((data) =>
            data.pay_id === rowId ? updatedRow : data
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

  const filteredPaymentData = paymentData.filter((row) =>
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
    { id: 'pay_id', label: 'Pay ID' },
    { id: 'pay', label: 'Pay' },
    { id: 'pay_pick_up', label: 'Pay Pick Up' },
    { id: 'pay_drop', label: 'Pay Drop' },
    { id: 'driver_id', label: 'Driver ID' },
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
        <Link component={RouterLink} to="/addpayment">
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
            {filteredPaymentData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.pay_id}
              >
                {headCells.map((headCell) => (
  <TableCell key={headCell.id} align="left">
    {headCell.id === 'actions' ? (
      editMode[row.pay_id] ? (
        <>
          <Button
            type="primary"
            size="small"
            onClick={() => handleSaveEdit(row.pay_id)}
          >
            Save
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => toggleEditMode(row.pay_id)}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Button
          type="link"
          size="small"
          onClick={() => toggleEditMode(row.pay_id)}
        >
          Edit
        </Button>
      )
    ) : headCell.id === 'driver_id' ? (
      <span style={{ color: 'gray' }}>
        {editMode[row.pay_id] ? (
          // Inside the Autocomplete component for driver_id
          <Autocomplete
            value={
              editedFields[row.pay_id]?.driver_id !== undefined
                ? { driver_id: editedFields[row.pay_id]?.driver_id }
                : { driver_id: row.driver_id }
            }
            onChange={(event, newValue) => {
              handleEditFieldChange(row.pay_id, 'driver_id', newValue?.driver_id || '');
            }}
            options={Object.values(driverOptions)}
            getOptionLabel={(option) => option.driver_id}
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
    ) : headCell.id === 'pay_id' ? (
      // Display the pay_id without an input field
      row.pay_id
    ) : (
      editMode[row.pay_id] ? (
        <TextField
          value={editedFields[row.pay_id]?.[headCell.id] || row[headCell.id]}
          onChange={(e) => handleEditFieldChange(row.pay_id, headCell.id, e.target.value)}
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
        count={filteredPaymentData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default PayTable;
