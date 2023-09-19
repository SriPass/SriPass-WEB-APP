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
import Autocomplete from '@mui/material/Autocomplete';

function DriverTable() {
  const [driverData, setDriverData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMode, setEditMode] = useState({});
  const [editedFields, setEditedFields] = useState({});
  const [loadData, setLoadData] = useState({});

  const key = 'updatable';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/driver/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setDriverData(data);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };
    fetchData();
    const fetchLoadData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/load/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setLoadData(data);

        const options = {};
        data.forEach((load) => {
          options[load.load_no] = load;
        });
        setLoadNoOptions(options);
      } catch (error) {
        console.error('Error fetching load data:', error);
      }
    };
    fetchLoadData();
  }, []);

  const toggleEditMode = (rowId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [rowId]: !prevEditMode[rowId],
    }));
  };

  const handleEditFieldChange = (rowId, fieldId, value) => {
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [rowId]: {
        ...prevEditedFields[rowId],
        [fieldId]: value,
      },
    }));
  };

  const handleSaveEdit = async (rowId) => {
    const editedRow = driverData.find((row) => row.driver_id === rowId);

    if (editedRow) {
      try {
        const updatedRow = { ...editedRow, ...editedFields[rowId] };

        const response = await fetch(`http://15.156.146.25:8070/api/driver/update/${rowId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRow),
        });

        if (!response.ok) {
          throw new Error('Failed to update data');
        }

        setDriverData((prevDriverData) => {
          const updatedData = prevDriverData.map((data) =>
            data.driver_id === rowId ? updatedRow : data
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
        console.error('Error updating data:', error);
      }
    }
  };

  const headCells = [
    { id: 'driver_id', label: 'Driver ID' },
    { id: 'name', label: 'Name' },
    { id: 'tel', label: 'Telephone' },
    { id: 'address', label: 'Address' },
    { id: 'country', label: 'Country' },
    { id: 'state_province', label: 'State Province' },
    { id: 'licences', label: 'Licences' },
    { id: 'email', label: 'Email' },
    { id: 'load_no', label: 'Load No' },
    { id: 'actions', label: 'Actions' },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Modify your filter function to search through all fields of each row
  const filteredData = driverData
    .filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
        <Link component={RouterLink} to="/adddriver">
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
            {filteredData.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.driver_id}>
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align="left">
                    {headCell.id === 'actions' ? (
                      editMode[row.driver_id] ? (
                        <Button
                          type="primary"
                          size="small"
                          onClick={() => handleSaveEdit(row.driver_id)}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          type="link"
                          size="small"
                          onClick={() => toggleEditMode(row.driver_id)}
                        >
                          Edit
                        </Button>
                      )
                    ) : headCell.id === 'load_no' ? (
                      <span style={{ color: 'gray' }}>
                        {editMode[row.driver_id] ? (
                          <Autocomplete
                            value={
                              editedFields[row.driver_id]?.load_no !== undefined
                                ? { load_no: editedFields[row.driver_id]?.load_no }
                                : { load_no: row.load_no }
                            }
                            onChange={(event, newValue) => {
                              handleEditFieldChange(row.driver_id, 'load_no', newValue?.load_no || '');
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
                      headCell.id === 'driver_id' ? (
                        row[headCell.id] // Render Driver ID as non-editable
                      ) : (
                        editMode[row.driver_id] ? (
                          <TextField
                            value={editedFields[row.driver_id]?.[headCell.id] || row[headCell.id]}
                            onChange={(e) =>
                              handleEditFieldChange(row.driver_id, headCell.id, e.target.value)
                            }
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

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default DriverTable;
