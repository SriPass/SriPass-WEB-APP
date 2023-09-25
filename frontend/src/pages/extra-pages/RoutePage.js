import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    List,
    ListItemButton,
    ListItemText,
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
    Typography

} from '@mui/material';
import MainCard from 'components/MainCard';
import Map from 'pages/components-overview/Map';
import AddRoute from 'pages/components-overview/AddRoute';
import SearchIcon from '@mui/icons-material/Search';
import { message } from 'antd';
import { Add as AddIcon } from '@mui/icons-material';

const RoutePage = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [data, setData] = useState([]);
    const [editingRoute, setEditingRoute] = useState(null);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState('-');
    const [viewRouteDetails, setViewRouteDetails] = useState({ from: '-', to: '-' });
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [viewDestinationsModal, setViewDestinationsModal] = useState(false);

    const handleViewDestinations = (route) => {
        setSelectedRoute(route);
        setViewDestinationsModal(true);
    };

    const closeViewDestinationsModal = () => {
        setSelectedRoute(null);
        setViewDestinationsModal(false);
    };

    const handleAddDestination = () => {
        // Create a copy of the editingRoute
        const updatedRoute = { ...editingRoute };

        // Create a new destination object with initial values
        const newDestination = {
            startPoint: '',
            endPoint: '',
            fare: '',
        };

        // Append the new destination to the destinations array
        updatedRoute.destinations.push(newDestination);

        // Update the editingRoute state
        setEditingRoute(updatedRoute);
    };

    const handleDeleteDestination = (index) => {
        // Create a copy of the editingRoute
        const updatedRoute = { ...editingRoute };

        // Remove the destination at the specified index
        updatedRoute.destinations.splice(index, 1);

        // Update the editingRoute state
        setEditingRoute(updatedRoute);
    };





    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://sripass.onrender.com/api/busroutes/');
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
        { id: 'destinations', label: 'Destinations' }, // Add this line
        { id: 'map', label: 'Map' },
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
        fetch(`https://sripass.onrender.com/api/busroutes/${routeId}`, {
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

    const handleDestinationChange = (index, field, value) => {
        // Create a copy of the editingRoute
        const updatedRoute = { ...editingRoute };

        // Update the specific destination field
        updatedRoute.destinations[index][field] = value;

        // Update the editingRoute state
        setEditingRoute(updatedRoute);
    };

    const handleSaveEdit = () => {
        const routeId = editingRoute._id; // Use _id as the identifier


        fetch(`https://sripass.onrender.com/api/busroutes/${routeId}`, {
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
            const response = await fetch('https://sripass.onrender.com/api/busroutes/');
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
    const [viewRoute, setViewRoute] = useState(null);

    const handleViewRoute = (row) => {
        setViewRoute({ from: row.from, to: row.to });
        setViewRouteDetails({
            from: row.from,
            to: row.to,
        });
    };

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Route Details</Typography>
                    </Grid>

                </Grid>
                <MainCard content={false} sx={{ mt: 1.5, padding: 2 }}>
                    <Box sx={{ pt: 1, pr: 2 }}>
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
                                                        <Button variant="outlined" onClick={() => handleViewDestinations(row)}>
                                                            VIEW DESTINATIONS
                                                        </Button>
                                                    </TableCell>



                                                    <TableCell align="left">
                                                        {/* Add the "See" button */}
                                                        {/* Change the "See" text to a Button */}
                                                        <Button variant="outlined" onClick={() => handleViewRoute(row)}>
                                                            VIEW
                                                        </Button>
                                                    </TableCell>
                                                   
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

                            {/* Modal to display destinations */}
                            <Dialog open={viewDestinationsModal} onClose={closeViewDestinationsModal}>
                                <DialogTitle>Destinations for Route {selectedRoute?.RouteNo}</DialogTitle>
                                <DialogContent>
                                    {selectedRoute?.destinations && selectedRoute.destinations.length > 0 ? (
                                        selectedRoute.destinations.map((destination, index) => (
                                            <div key={index}>
                                                <strong>Destination {index + 1}:</strong><br />
                                                <strong>Start Point:</strong> {destination.startPoint}<br />
                                                <strong>End Point:</strong> {destination.endPoint}<br />
                                                <strong>Fare:</strong> LKR {destination.fare}<br />
                                                {index !== selectedRoute.destinations.length - 1 && <br />}
                                            </div>
                                        ))
                                    ) : (
                                        <div style={{ color: 'gray' }}>No destinations available for this route.</div>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={closeViewDestinationsModal} color="primary">
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>

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


                                    {editingRoute && editingRoute.destinations && (
                                        <div>
                                            <Typography variant="h6" style={{ marginBottom: '20px' }}>Destinations</Typography>
                                            {editingRoute.destinations.map((destination, index) => (
                                                <div key={index}>
                                                    {/* Add a delete button for each destination */}

                                                    <TextField
                                                        label={`Start Point ${index + 1}`}
                                                        variant="outlined"
                                                        style={{ marginBottom: '20px', marginRight: '20px' }}
                                                        value={destination.startPoint}
                                                        onChange={(e) =>
                                                            handleDestinationChange(index, 'startPoint', e.target.value)
                                                        }
                                                    />
                                                    <TextField
                                                        label={`End Point ${index + 1}`}
                                                        variant="outlined"
                                                        style={{ marginBottom: '20px', marginRight: '20px' }}
                                                        value={destination.endPoint}
                                                        onChange={(e) =>
                                                            handleDestinationChange(index, 'endPoint', e.target.value)
                                                        }
                                                    />
                                                    <TextField
                                                        label={`Fare ${index + 1}`}
                                                        variant="outlined"
                                                        style={{ marginBottom: '20px', marginRight: '20px' }}
                                                        value={destination.fare}
                                                        onChange={(e) =>
                                                            handleDestinationChange(index, 'fare', e.target.value)
                                                        }
                                                    />
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        style={{ marginBottom: '20px' }}
                                                        onClick={() => handleDeleteDestination(index)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleAddDestination}
                                    >
                                          <AddIcon />
                                        Add Destination
                                    </Button>
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
                    </Box>
                </MainCard>

            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Add New Route</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <AddRoute />
                </MainCard>
            </Grid>

            {/* row 3 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Route</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Map
                        start={viewRoute ? viewRoute.from : null}
                        destination={viewRoute ? viewRoute.to : null}
                        onEstimatedTimeUpdate={(time) => setEstimatedTime(time)}
                    />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Route Details</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                        <ListItemButton divider>
                            <ListItemText primary="Estimated Time" />
                            <Typography variant="h5">{estimatedTime}</Typography>
                        </ListItemButton>
                        {viewRouteDetails && (
                            <>
                                <ListItemButton divider>
                                    <ListItemText primary="Start" />
                                    <Typography variant="h5">{viewRouteDetails.from}</Typography>
                                </ListItemButton>
                                <ListItemButton>
                                    <ListItemText primary="Destination" />
                                    <Typography variant="h5">{viewRouteDetails.to}</Typography>
                                </ListItemButton>
                            </>
                        )}
                    </List>
                </MainCard>

            </Grid>


        </Grid>


    );
};

export default RoutePage;
