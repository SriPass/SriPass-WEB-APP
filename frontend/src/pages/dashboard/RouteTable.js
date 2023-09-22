import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    TablePagination,
    TextField,
    InputAdornment,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { message } from 'antd';

function RouteTable() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState([]);
    const [editingRoute, setEditingRoute] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8070/api/busroutes/');
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
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

    const headCells = [
        { id: 'RouteNo', label: 'Route No' },
        { id: 'from', label: 'From' },
        { id: 'to', label: 'To' },
        { id: 'vehicleNo', label: 'Vehicle No' },
        { id: 'actions', label: 'Actions' },
    ];

    const key = 'updatable'; // Define a unique key for the message

    const handleEdit = (row) => {
        setEditingRoute(row);
    };

    const handleDelete = (row) => {
        setDeleteConfirmation(row);
    };

    const confirmDelete = () => {
        // Make the DELETE request here and handle success/failure
        const routeId = deleteConfirmation._id; // Use _id as the identifier
        fetch(`http://localhost:8070/api/busroutes/${routeId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                     // Handle success
                     message.open({
                        key,
                        type: 'loading',
                        content: 'Loading...',
                    });
    
                    setTimeout(() => {
                        message.open({
                            key,
                            type: 'success',
                            content: 'Route deleted successfully',
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
                    fetchData();
                } else {
                     // Handle success
                     message.open({
                        key,
                        type: 'loading',
                        content: 'Loading...',
                    });
    
                    setTimeout(() => {
                        message.open({
                            key,
                            type: 'error',
                            content: 'Error',
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
                    console.error('Error deleting route');
                }
            })
            .catch((error) => {
                console.error('Error deleting route:', error);
            })
            .finally(() => {
                setDeleteConfirmation(null);
            });
    };

    const handleCloseEditModal = () => {
        setEditingRoute(null);
    };

    const handleSaveEdit = () => {
        const routeId = editingRoute._id; // Use _id as the identifier
        
    
        fetch(`http://localhost:8070/api/busroutes/${routeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editingRoute), // Assuming editingRoute holds the updated data
        })
            .then((response) => {
                if (response.ok) {
                    // Handle success
                    message.open({
                        key,
                        type: 'loading',
                        content: 'Loading...',
                    });
    
                    setTimeout(() => {
                        message.open({
                            key,
                            type: 'success',
                            content: 'Route updated successfully',
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
    
                    // Reload data or update state as needed
                    // For example, you can fetch data again to update the table
                    fetchData();
                } else {
                    message.open({
                        key,
                        type: 'loading',
                        content: 'Loading...',
                    });
    
                    setTimeout(() => {
                        message.open({
                            key,
                            type: 'error',
                            content: 'Error',
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
                    console.error('Error updating route');
                }
            })
            .catch((error) => {
                console.error('Error updating route:', error);
            })
            .finally(() => {
                setEditingRoute(null);
            });
    };
    
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8070/api/busroutes/');
            if (!response.ok) {
                throw new Error('API request failed');
            }
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Filter data based on the search query
    const filteredData = data.filter((item) =>
        item.RouteNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box>
            {/* Search and Add Button */}
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
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
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
                    {/* Render table rows */}
                    <tbody>
                        {filteredData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow key={row.RouteNo}>
                                    <TableCell align="left">{row.RouteNo}</TableCell>
                                    <TableCell align="left">{row.from}</TableCell>
                                    <TableCell align="left">{row.to}</TableCell>
                                    <TableCell align="left">{row.vehicleNo}</TableCell>
                                    <TableCell align="left">
                                        <IconButton onClick={() => handleEdit(row)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(row)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </tbody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5]} // Include 5 as an option
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />


            {/* Edit Modal */}
            <Dialog open={!!editingRoute} onClose={handleCloseEditModal}>
                <DialogTitle>Edit Route</DialogTitle>
                <DialogContent style={{ padding: '30px' }}>
                    {/* Edit form fields go here */}
                    {/* Example: */}
                    <TextField
                        label="Route No"
                        variant="outlined"
                        style={{ marginBottom: '20px', marginRight: '20px' }} // Add margin or padding as needed
                        value={editingRoute ? editingRoute.RouteNo : ''}
                        onChange={(e) =>
                            setEditingRoute({ ...editingRoute, RouteNo: e.target.value })
                        }
                    />
                    <TextField
                        label="From"
                        variant="outlined"
                        style={{ marginBottom: '20px', marginRight: '20px' }} // Add margin or padding as needed
                        value={editingRoute ? editingRoute.from : ''}
                        onChange={(e) => setEditingRoute({ ...editingRoute, from: e.target.value })}
                    />
                    <TextField
                        label="To"
                        variant="outlined"
                        style={{ marginBottom: '20px', marginRight: '20px' }} // Add margin or padding as needed
                        value={editingRoute ? editingRoute.to : ''}
                        onChange={(e) => setEditingRoute({ ...editingRoute, to: e.target.value })}
                    />
                    <TextField
                        label="Vehicle No"
                        variant="outlined"
                        style={{ marginBottom: '20px', marginRight: '20px' }} // Add margin or padding as needed
                        value={editingRoute ? editingRoute.vehicleNo : ''}
                        onChange={(e) =>
                            setEditingRoute({ ...editingRoute, vehicleNo: e.target.value })
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditModal} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>



            {/* Delete Confirmation Dialog */}
            <Dialog open={!!deleteConfirmation} onClose={() => setDeleteConfirmation(null)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this route?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmation(null)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default RouteTable;
