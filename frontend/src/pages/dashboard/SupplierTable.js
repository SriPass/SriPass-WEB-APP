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
import { format } from 'date-fns';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function SupplierTable() {
  const [supplierData, setSupplierData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMode, setEditMode] = useState({});
  const [editedDate, setEditedDate] = useState({});
  const key = 'updatable';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/supplier/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setSupplierData(data);
      } catch (error) {
        console.error('Error fetching supplier data:', error);
      }
    };
    fetchData();
  }, []);

  const toggleEditMode = (rowId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [rowId]: !prevEditMode[rowId],
    }));
  };

  const handleEditFieldChange = (rowId, fieldId, value) => {
    if (fieldId !== 'supplier_id') {
      const updatedData = supplierData.map((row) =>
        row.supplier_id === rowId ? { ...row, [fieldId]: fieldId === 'date' ? editedDate[rowId] : value } : row
      );
      setSupplierData(updatedData);
    }
  };

  const handleSaveEdit = async (editedRow) => {
    // Check if editedDate exists for the current rowId
    if (editedDate[editedRow.supplier_id]) {
      editedRow.date = editedDate[editedRow.supplier_id].format('YYYY-MM-DD'); // Format date to 'YYYY-MM-DD'
    } else {
      // Handle the case where editedDate is undefined
      console.error(`editedDate not found for rowId ${editedRow.supplier_id}`);
      return; // Exit the function early
    }

    try {
      const response = await fetch(`http://15.156.146.25:8070/api/supplier/update/${editedRow.supplier_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedRow),
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      // Message for success
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

      toggleEditMode(editedRow.supplier_id);
    } catch (error) {
      // Message for error
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
  };

  const filteredSupplierData = supplierData.filter((row) =>
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
    { id: 'supplier_id', label: 'Supplier ID' },
    { id: 'name', label: 'Name' },
    { id: 'address', label: 'Address' },
    { id: 'tel', label: 'Tel' },
    { id: 'email', label: 'Email' },
    { id: 'paid_status', label: 'Paid Status' },
    { id: 'date', label: 'Date' },
    { id: 'contact_name', label: 'Contact Name' },
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
        <Link component={RouterLink} to="/addsupplier">
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
            {filteredSupplierData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.supplier_id}
              >
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align="left"
                    sx={
                      headCell.id === 'contact_name'
                        ? { '&:last-child td, &:last-child th': { border: 0 } }
                        : {}
                    }
                  >
                    {headCell.id === 'date' ? (
                      editMode[row.supplier_id] ? (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            value={editedDate[row.supplier_id] || dayjs(row[headCell.id])}
                            onChange={(newDate) => setEditedDate((prevEditedDate) => ({ ...prevEditedDate, [row.supplier_id]: newDate }))}
                            views={['year', 'month', 'day']} // Show year, month, and day
                          />
                        </LocalizationProvider>
                      ) : (
                        format(new Date(row[headCell.id]), 'yyyy-MM-dd') // Adjust date format as needed
                      )
                    ) : headCell.id === 'actions' ? (
                      editMode[row.supplier_id] ? (
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => handleSaveEdit(row)}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          type="link"
                          size="small"
                          onClick={() => toggleEditMode(row.supplier_id)}
                        >
                          Edit
                        </Button>
                      )
                    ) : headCell.id === 'supplier_id' ? (
                      // Display supplier_id as is (not editable)
                      row[headCell.id]
                    ) : (
                      // Display other fields as is (not editable)
                      editMode[row.supplier_id] ? ( // Check if the field is not 'supplier_id'
                        <TextField
                          value={row[headCell.id]}
                          onChange={(e) => handleEditFieldChange(row.supplier_id, headCell.id, e.target.value)}
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
        count={filteredSupplierData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default SupplierTable;
