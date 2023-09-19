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
import { format } from 'date-fns'; // Import date-fns for date formatting
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Import AdapterDayjs
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Import LocalizationProvider
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'; // Import DateTimePicker
import dayjs from 'dayjs';

function ExpensesTable() {
  const [expensesData, setExpensesData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMode, setEditMode] = useState({});
  const [editedFields, setEditedFields] = useState({});
  const [supplierOptions, setSupplierOptions] = useState({});
  const key = 'updatable';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/expenses/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setExpensesData(data);
      } catch (error) {
        console.error('Error fetching expenses data:', error);
      }
    };
    fetchData();

    const fetchSupplierData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/supplier/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();

        // Create supplier options for Autocomplete
        const options = {};
        data.forEach((supplier) => {
          options[supplier.supplier_id] = supplier;
        });
        setSupplierOptions(options);
      } catch (error) {
        console.error('Error fetching supplier data:', error);
      }
    };
    fetchSupplierData();
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

    
    const editedRow = expensesData.find((row) => row.expenses_id === rowId);
    

    if (editedRow) {
      try {
        const updatedRow = { ...editedRow, ...editedFields[rowId] };

        const response = await fetch(`http://15.156.146.25:8070/api/expenses/update/${rowId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRow),
        });

        if (!response.ok) {
          throw new Error('Failed to update data');
        }

        setExpensesData((prevExpensesData) => {
          const updatedData = prevExpensesData.map((data) =>
            data.expenses_id === rowId ? updatedRow : data
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

  const filteredExpensesData = expensesData.filter((row) =>
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
    { id: 'expenses_id', label: 'Expenses ID' },
    { id: 'truck_no', label: 'Truck No' },
    { id: 'trailer_no', label: 'Trailer No' },
    { id: 'lease', label: 'Lease' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'fuel_total', label: 'Fuel Total' },
    { id: 'fuel_per_truck', label: 'Fuel Per Truck' },
    { id: 'date', label: 'Date' },
    { id: 'currency', label: 'Currency' },
    { id: 'gross', label: 'Gross' },
    { id: 'net', label: 'Net' },
    { id: 'tax', label: 'Tax' },
    { id: 'comment', label: 'Comment' },
    { id: 'state_province', label: 'State Province' },
    { id: 'name', label: 'Name' },
    { id: 'supplier_id', label: 'Supplier ID' }, // Replace 'carrier_rate_id' with 'supplier_id'
    { id: 'actions', label: 'Actions' },
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
        <Link component={RouterLink} to="/addexpenses">
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
            {filteredExpensesData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.expenses_id}
              >
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align="left">
                    {headCell.id === 'actions' ? (
                      editMode[row.expenses_id] ? (
                        <>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => handleSaveEdit(row.expenses_id)}
                          >
                            Save
                          </Button>
                        </>
                      ) : (
                        <Button
                          type="link"
                          size="small"
                          onClick={() => toggleEditMode(row.expenses_id)}
                        >
                          Edit
                        </Button>
                      )
                    ) : headCell.id === 'date' ? (
                      <span>
                        {editMode[row.expenses_id] ? (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              renderInput={(props) => <TextField {...props} />}
                              value={editedFields[row.expenses_id]?.date || dayjs(row.date)}
                              onChange={(newDate) => handleEditFieldChange(row.expenses_id, 'date', newDate)}
                              views={['year', 'month', 'day']}
                            />
                          </LocalizationProvider>
                        ) : (
                          format(new Date(row.date), 'yyyy-MM-dd')
                        )}
                      </span>
                    ) : headCell.id === 'supplier_id' ? (
                      <span style={{ color: 'gray' }}>
                        {editMode[row.expenses_id] ? (
                          <Autocomplete
                            value={
                              editedFields[row.expenses_id]?.supplier_id !== undefined
                                ? { supplier_id: editedFields[row.expenses_id]?.supplier_id }
                                : { supplier_id: row.supplier_id }
                            }
                            onChange={(event, newValue) => {
                              handleEditFieldChange(row.expenses_id, 'supplier_id', newValue?.supplier_id || '');
                            }}
                            options={Object.values(supplierOptions)}
                            getOptionLabel={(option) => option.supplier_id}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                size="small"
                                InputProps={{
                                  ...params.InputProps,
                                  endAdornment: null,
                                }}
                              />
                            )}
                          />
                        ) : (
                          row[headCell.id]
                        )}
                      </span>
                    ) : (
                      // Skip rendering input fields for "Expenses ID," "Truck No," and "Trailer No"
                      ['expenses_id', 'truck_no', 'trailer_no'].includes(headCell.id) ? (
                        row[headCell.id]
                      ) : (
                        editMode[row.expenses_id] ? (
                          <TextField
                            value={editedFields[row.expenses_id]?.[headCell.id] || row[headCell.id]}
                            onChange={(e) => handleEditFieldChange(row.expenses_id, headCell.id, e.target.value)}
                          />
                        ) : (
                          row[headCell.id]
                        )
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
        count={filteredExpensesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default ExpensesTable;