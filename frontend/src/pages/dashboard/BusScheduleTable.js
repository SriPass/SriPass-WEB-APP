import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
} from '@mui/material';
import MainCard from 'components/MainCard';
import AddBusSchedule from 'pages/components-overview/AddBusSchedule';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';

const RoutePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sripass.onrender.com/api/bus-schedules');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (row) => {
    setEditingData(row);
    setEditedData({
      RouteNo: row.RouteNo,
      StartDate: row.StartDate,
      EndDate: row.EndDate,
      StartTime: row.StartTime,
      EndTime: row.EndTime,
      VehicleNo: row.VehicleNo,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleFieldChange = (e, fieldName) => {
    const newValue = e.target.value;
    setEditedData((prevData) => ({
      ...prevData,
      [fieldName]: newValue,
    }));
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`https://sripass.onrender.com/api/bus-schedules/${editingData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
      if (!response.ok) {
        throw new Error('Failed to save edit');
      }
      // Update the data in your local state if needed
      setIsEditModalOpen(false);

    } catch (error) {
      console.error('Error saving edit:', error);

    }
  };

  const filteredData = data.filter((item) => item.RouteNo.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={7} lg={8}>
        <MainCard content={false} sx={{ mt: 1.5, padding: 2 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <Box>

              {/* Conditionally render a loading spinner or the table */}
              {loading ? (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  height="300px" // Adjust the height as needed
                >
                  <CircularProgress />
                </Box>// Render a spinner when loading is true
              ) : (
                <>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '20px',
                      marginBottom: '30px'
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
                              <SearchIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                  </div>

                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Route No</TableCell>
                          <TableCell>Start Date</TableCell>
                          <TableCell>End Date</TableCell>
                          <TableCell>Start Time</TableCell>
                          <TableCell>End Time</TableCell>
                          <TableCell>Vehicle No</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                          <TableRow key={row._id}>
                            <TableCell align="left">
                              <Chip
                                avatar={
                                  <Avatar style={{ backgroundColor: 'red', color: 'white' }}>R</Avatar>
                                }
                                label={row.RouteNo}
                              />

                            </TableCell>
                            <TableCell>{row.StartDate}</TableCell>
                            <TableCell>{row.EndDate}</TableCell>
                            <TableCell>{row.StartTime}</TableCell>
                            <TableCell>{row.EndTime}</TableCell>
                            <TableCell>{row.VehicleNo}</TableCell>
                            <TableCell align="left">
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(row)}
                                style={{ marginRight: '8px' }}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleEdit(row)}
                              >
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />

                  {/* Edit Modal */}
                  <Dialog open={isEditModalOpen} onClose={handleCloseEditModal}>
                    <DialogTitle>Edit Row</DialogTitle>
                    <DialogContent>
                      <TextField
                        label="Route No"
                        value={editedData.RouteNo}
                        onChange={(e) => handleFieldChange(e, 'RouteNo')}
                      />
                      <TextField
                        label="Start Date"
                        value={editedData.StartDate}
                        onChange={(e) => handleFieldChange(e, 'StartDate')}
                      />
                      <TextField
                        label="End Date"
                        value={editedData.EndDate}
                        onChange={(e) => handleFieldChange(e, 'EndDate')}
                      />
                      <TextField
                        label="Start Time"
                        value={editedData.StartTime}
                        onChange={(e) => handleFieldChange(e, 'StartTime')}
                      />
                      <TextField
                        label="End Time"
                        value={editedData.EndTime}
                        onChange={(e) => handleFieldChange(e, 'EndTime')}
                      />
                      <TextField
                        label="Vehicle No"
                        value={editedData.VehicleNo}
                        onChange={(e) => handleFieldChange(e, 'VehicleNo')}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseEditModal}>Cancel</Button>
                      <Button onClick={handleSaveEdit}>Save</Button>
                    </DialogActions>
                  </Dialog>

                </>

              )}
            </Box>
          </Box>


        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <AddBusSchedule />
      </Grid>
    </Grid>
  );
};

export default RoutePage;
