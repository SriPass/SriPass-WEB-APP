import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

function DriverTable() {
  const [drivers, setDrivers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDriverId, setDeleteDriverId] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8070/api/driver/');
        if (!response.ok) {
          throw new Error('Failed to fetch driver data');
        }
        const data = await response.json();
        setDrivers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching driver data:', error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const openDeleteDialog = (driverId) => {
    setDeleteDriverId(driverId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDriverId(null);
    setDeleteDialogOpen(false);
  };

  const openEditDialog = (driverId) => {
    setSelectedDriverId(driverId);

    // Populate editedFields with the existing data for the selected driver
    const driverToEdit = drivers.find((driver) => driver._id === driverId);
    if (driverToEdit) {
      setEditedFields({
        [driverId]: {
          driver_id: driverToEdit.driver_id,
          name: driverToEdit.name,
          tel: driverToEdit.tel,
          address: driverToEdit.address,
          assignedRoute: driverToEdit.assignedRoute,
          assignedVehicle: driverToEdit.assignedVehicle,
        },
      });
    }

    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedDriverId(null);
    setEditDialogOpen(false);
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

  const handleDelete = async (driverId) => {
    try {
      const response = await fetch(`http://localhost:8070/api/driver/${driverId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete driver');
      }
      const responseData = await response.json();
      console.log(responseData.message); // Log the success message
      setDrivers(drivers.filter((driver) => driver._id !== driverId)); // Use _id for comparison
      closeDeleteDialog();
    } catch (error) {
      console.error('Error deleting driver:', error);
    }
  };

  const handleSaveEdit = async (rowId) => {
    try {
      const updatedDriver = { ...drivers.find((driver) => driver.driver_id === rowId), ...editedFields[rowId] };
      const response = await fetch(`http://localhost:8070/api/driver/${rowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDriver),
      });
      if (!response.ok) {
        throw new Error('Failed to update driver');
      }
      const updatedDrivers = drivers.map((driver) => (driver.driver_id === rowId ? updatedDriver : driver));
      setDrivers(updatedDrivers);
      closeEditDialog();
    } catch (error) {
      console.error('Error updating driver:', error);
    }
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedDrivers = drivers.slice(startIndex, endIndex);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Driver ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Telephone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Assigned Route</TableCell>
                <TableCell>Assigned Vehicle</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedDrivers.map((driver) => (
                <TableRow key={driver.driver_id}>
                  <TableCell>{driver.driver_id}</TableCell>
                  <TableCell>{driver.name}</TableCell>
                  <TableCell>{driver.tel}</TableCell>
                  <TableCell>{driver.address}</TableCell>
                  <TableCell>{driver.assignedRoute}</TableCell>
                  <TableCell>{driver.assignedVehicle}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => openDeleteDialog(driver._id)}
                      style={{ marginRight: '8px' }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditDialog(driver._id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={drivers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Driver</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this driver?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deleteDriverId)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Driver</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit driver details:</DialogContentText>
          <TextField
            label="Driver ID"
            value={editedFields[selectedDriverId]?.driver_id || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedDriverId, 'driver_id', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            value={editedFields[selectedDriverId]?.name || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedDriverId, 'name', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Telephone"
            value={editedFields[selectedDriverId]?.tel || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedDriverId, 'tel', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={editedFields[selectedDriverId]?.address || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedDriverId, 'address', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Assigned Route"
            value={editedFields[selectedDriverId]?.assignedRoute || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedDriverId, 'assignedRoute', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Assigned Vehicle"
            value={editedFields[selectedDriverId]?.assignedVehicle || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedDriverId, 'assignedVehicle', e.target.value)
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSaveEdit(selectedDriverId)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DriverTable;
