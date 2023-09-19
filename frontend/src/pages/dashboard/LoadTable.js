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

function LoadTable() {
  const [loadData, setLoadData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMode, setEditMode] = useState({});
  const [editedPickupDate, setEditedPickupDate] = useState({});
  const [editedDeliveryDate, setEditedDeliveryDate] = useState({});
  const [editedDate, setEditedDate] = useState({});
  const key = 'updatable';

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const toggleEditMode = (rowId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [rowId]: !prevEditMode[rowId],
    }));

    // Initialize editedDate if it doesn't exist for the current rowId
    if (!editedDate[rowId]) {
      setEditedDate((prevEditedDate) => ({
        ...prevEditedDate,
        [rowId]: dayjs(
          loadData.find((row) => row.load_no === rowId).pickup_date // Use 'pickup_date' or 'delivery_date' here
        ),
      }));
    }
  };


  const handleEditFieldChange = (rowId, fieldId, value) => {
    if (fieldId !== 'load_no') {
      const updatedData = loadData.map((row) =>
        row.load_no === rowId
          ? {
            ...row,
            [fieldId]: fieldId === 'date' ? editedDate[rowId] : value,
          }
          : row
      );
      setLoadData(updatedData);
    }
  };

  const handleSaveEdit = async (editedRow) => {
    try {
      const editedData = { ...editedRow };
  
      // Check if editedPickupDate exists for the current rowId
      if (editedPickupDate[editedRow.load_no]) {
        editedData.pickup_date = editedPickupDate[editedRow.load_no].format(
          'YYYY-MM-DD'
        );
      } else {
        console.error(`editedPickupDate not found for rowId ${editedRow.load_no}`);
        return; // Exit the function early
      }
  
      // Check if editedDeliveryDate exists for the current rowId
      if (editedDeliveryDate[editedRow.load_no]) {
        editedData.delivery_date = editedDeliveryDate[editedRow.load_no].format(
          'YYYY-MM-DD'
        );
      } else {
        console.error(
          `editedDeliveryDate not found for rowId ${editedRow.load_no}`
        );
        return; // Exit the function early
      }
  
      const response = await fetch(
        `http://15.156.146.25:8070/api/load/update/${editedRow.load_no}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedData),
        }
      );
  
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
  
      toggleEditMode(editedRow.load_no);
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
  

  const filteredLoadData = loadData.filter((row) =>
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
    { id: 'load_no', label: 'Load No' },
    { id: 'pickup_date', label: 'Pickup Date' },
    { id: 'delivery_date', label: 'Delivery Date' },
    { id: 'time', label: 'Time' },
    { id: 'notes', label: 'Notes' },
    { id: 'po_numbers', label: 'PO Numbers' },
    { id: 'custom_broker', label: 'Custom Broker' },
    { id: 'status', label: 'Status' },
    { id: 'actions', label: 'Actions' },
  ];

  return (
    <Box>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '20px',
          marginBottom: '30px',
        }}
      >
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
        <Link component={RouterLink} to="/addload">
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
            {filteredLoadData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.load_no}
                >
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align="left"
                      sx={
                        headCell.id === 'status'
                          ? {
                            '&:last-child td, &:last-child th': { border: 0 },
                          }
                          : {}
                      }
                    >
                      {headCell.id === 'pickup_date' ? (
                        editMode[row.load_no] ? (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              renderInput={(props) => <TextField {...props} />}
                              value={
                                editedPickupDate[row.load_no] ||
                                dayjs(row.pickup_date)
                              }
                              onChange={(newDate) =>
                                setEditedPickupDate((prevEditedDates) => ({
                                  ...prevEditedDates,
                                  [row.load_no]: newDate,
                                }))
                              }
                              views={['year', 'month', 'day']}
                            />
                          </LocalizationProvider>
                        ) : (
                          format(new Date(row.pickup_date), 'yyyy-MM-dd')
                        )
                      ) : headCell.id === 'delivery_date' ? (
                        editMode[row.load_no] ? (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                              renderInput={(props) => <TextField {...props} />}
                              value={
                                editedDeliveryDate[row.load_no] ||
                                dayjs(row.delivery_date)
                              }
                              onChange={(newDate) =>
                                setEditedDeliveryDate((prevEditedDates) => ({
                                  ...prevEditedDates,
                                  [row.load_no]: newDate,
                                }))
                              }
                              views={['year', 'month', 'day']}
                            />
                          </LocalizationProvider>
                        ) : (
                          format(new Date(row.delivery_date), 'yyyy-MM-dd')
                        )
                      ) : headCell.id === 'actions' ? (
                        editMode[row.load_no] ? (
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
                            onClick={() => toggleEditMode(row.load_no)}
                          >
                            Edit
                          </Button>
                        )
                      ) : headCell.id === 'load_no' ? (
                        // Display load_no as is (not editable)
                        row[headCell.id]
                      ) : (
                        // Display other fields as is (not editable)
                        editMode[row.load_no] ? (
                          <TextField
                            value={row[headCell.id]}
                            onChange={(e) =>
                              handleEditFieldChange(
                                row.load_no,
                                headCell.id,
                                e.target.value
                              )
                            }
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
        count={filteredLoadData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default LoadTable;
