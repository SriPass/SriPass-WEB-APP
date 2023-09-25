
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

function PassengerTable() {
  const [passengers, setPassengers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePassengerId, setDeletePassengerId] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPassengerId, setSelectedPassengerId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://sripass.onrender.com/api/localpassengers');
        if (!response.ok) {
          throw new Error('Failed to fetch passenger data');
        }
        const data = await response.json();
        setPassengers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching passenger data:', error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const openDeleteDialog = (passengerId) => {
    setDeletePassengerId(passengerId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeletePassengerId(null);
    setDeleteDialogOpen(false);
  };

  const openEditDialog = (passengerId) => {
    setSelectedPassengerId(passengerId);

    // Populate editedFields with the existing data for the selected passenger
    const passengerToEdit = passengers.find((passenger) => passenger._id === passengerId);
    if (passengerToEdit) {
      setEditedFields({
        [passengerId]: {
          firstName: passengerToEdit.firstName,
          lastName: passengerToEdit.lastName,
          contactNumber: passengerToEdit.contactNumber,
          address: passengerToEdit.address,
          // Add other fields as needed
        },
      });
    }

    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedPassengerId(null);
    setEditDialogOpen(false);
  };

  const handleEditFieldChange = (passengerId, fieldId, value) => {
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [passengerId]: {
        ...prevEditedFields[passengerId],
        [fieldId]: value,
      },
    }));
  };

  const handleDelete = async (passengerId) => {
    try {
      const response = await fetch(`https://sripass.onrender.com/api/localpassengers/${passengerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete passenger');
      }
      const responseData = await response.json();
      console.log(responseData.message); // Log the success message
      setPassengers(passengers.filter((passenger) => passenger._id !== passengerId));
      closeDeleteDialog();
    } catch (error) {
      console.error('Error deleting passenger:', error);
    }
  };

  const handleSaveEdit = async (passengerId) => {
    try {
      const editedPassengerFields = editedFields[passengerId];
      const response = await fetch(`https://sripass.onrender.com/api/localpassengers/${passengerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedPassengerFields),
      });
      if (!response.ok) {
        throw new Error('Failed to update passenger');
      }
      

      // Update the passengers array with the edited data
      setPassengers((prevPassengers) =>
        prevPassengers.map((passenger) =>
          passenger._id === passengerId ? { ...passenger, ...editedPassengerFields } : passenger
        )
      );

      closeEditDialog();
    } catch (error) {
      console.error('Error updating passenger:', error);
    }
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedPassengers = passengers.slice(startIndex, endIndex);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Passenger ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Address</TableCell>
                {/* Add other table columns here */}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedPassengers.map((passenger) => (
                <TableRow key={passenger._id}>
                  <TableCell>{passenger._id}</TableCell>
                  <TableCell>{passenger.firstName}</TableCell>
                  <TableCell>{passenger.lastName}</TableCell>
                  <TableCell>{passenger.contactNumber}</TableCell>
                  <TableCell>{passenger.address}</TableCell>
                  {/* Add other table cells for additional columns */}
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => openDeleteDialog(passenger._id)}
                      style={{ marginRight: '8px' }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditDialog(passenger._id)}
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
        count={passengers.length}
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
        <DialogTitle id="alert-dialog-title">Delete Passenger</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this passenger?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deletePassengerId)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Passenger</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit passenger details:</DialogContentText>
          <TextField
            label="First Name"
            value={editedFields[selectedPassengerId]?.firstName || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedPassengerId, 'firstName', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={editedFields[selectedPassengerId]?.lastName || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedPassengerId, 'lastName', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Number"
            value={editedFields[selectedPassengerId]?.contactNumber || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedPassengerId, 'contactNumber', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={editedFields[selectedPassengerId]?.address || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedPassengerId, 'address', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          {/* Add other fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSaveEdit(selectedPassengerId)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PassengerTable;
