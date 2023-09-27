import React, { useState, useEffect } from 'react';
import {
  Box,
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

function BusTable() {
  const [buses, setBuses] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteBusId, setDeleteBusId] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://sripass.onrender.com/api/bus/');
        if (!response.ok) {
          throw new Error('Failed to fetch bus data');
        }
        const data = await response.json();
        setBuses(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching bus data:', error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const openDeleteDialog = (busId) => {
    setDeleteBusId(busId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteBusId(null);
    setDeleteDialogOpen(false);
  };

  const openEditDialog = (busId) => {
    setSelectedBusId(busId);

    // Populate editedFields with the existing data for the selected bus
    const busToEdit = buses.find((bus) => bus._id === busId);
    if (busToEdit) {
      setEditedFields({
        [busId]: {
          busId: busToEdit.busId,
          licensePlateNumber: busToEdit.licensePlateNumber,
          seatingCapacity: busToEdit.seatingCapacity,
          fuelType: busToEdit.fuelType,
          ownerInformation: busToEdit.ownerInformation,
        },
      });
    }

    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedBusId(null);
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

  const handleDelete = async (busId) => {
    try {
      const response = await fetch(`https://sripass.onrender.com/api/bus/${busId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete bus');
      }
      const responseData = await response.json();
      console.log(responseData.message); // Log the success message
      setBuses(buses.filter((bus) => bus._id !== busId)); // Use busId for comparison
      closeDeleteDialog();
    } catch (error) {
      console.error('Error deleting bus:', error);
    }
  };

  const handleSaveEdit = async (rowId) => {
    try {
      const updatedBus = { ...buses.find((bus) => bus._id === rowId), ...editedFields[rowId] };
      const response = await fetch(`https://sripass.onrender.com/api/bus/${rowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBus),
      });
      if (!response.ok) {
        throw new Error('Failed to update bus');
      }
      const updatedBuses = buses.map((bus) => (bus._id === rowId ? updatedBus : bus));
      setBuses(updatedBuses);
      closeEditDialog();
    } catch (error) {
      console.error('Error updating bus:', error);
    }
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedBuses = buses.slice(startIndex, endIndex);

  return (
    <div>
      {isLoading ? (
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="300px" // Adjust the height as needed
      >
        <CircularProgress />
      </Box>
      ) : (
        <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Bus ID</TableCell>
                <TableCell>License Plate Number</TableCell>
                <TableCell>Seating Capacity</TableCell>
                <TableCell>Fuel Type</TableCell>
                <TableCell>Owner Information</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedBuses.map((bus) => (
                <TableRow key={bus.busId}>
                  <TableCell>{bus.busId}</TableCell>
                  <TableCell>{bus.licensePlateNumber}</TableCell>
                  <TableCell>{bus.seatingCapacity}</TableCell>
                  <TableCell>{bus.fuelType}</TableCell>
                  <TableCell>{bus.ownerInformation}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => openDeleteDialog(bus._id)}
                      style={{ marginRight: '8px' }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditDialog(bus._id)}
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
        count={buses.length}
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
        <DialogTitle id="alert-dialog-title">Delete Bus</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this bus?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deleteBusId)} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Bus</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit bus details:</DialogContentText>
          <TextField
            label="Bus ID"
            value={editedFields[selectedBusId]?.busId || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedBusId, 'busId', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="License Plate Number"
            value={editedFields[selectedBusId]?.licensePlateNumber || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedBusId, 'licensePlateNumber', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Seating Capacity"
            value={editedFields[selectedBusId]?.seatingCapacity || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedBusId, 'seatingCapacity', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Fuel Type"
            value={editedFields[selectedBusId]?.fuelType || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedBusId, 'fuelType', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Owner Information"
            value={editedFields[selectedBusId]?.ownerInformation || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedBusId, 'ownerInformation', e.target.value)
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSaveEdit(selectedBusId)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BusTable;
