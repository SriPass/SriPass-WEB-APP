
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

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://sripass.onrender.com/api/localpassengers');
        if (!response.ok) {
          throw new Error('Failed to fetch customer data');
        }
        const data = await response.json();
        setCustomers(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const openDeleteDialog = (customerId) => {
    setDeleteCustomerId(customerId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteCustomerId(null);
    setDeleteDialogOpen(false);
  };

  const openEditDialog = (customerId) => {
    setSelectedCustomerId(customerId);

    // Populate editedFields with the existing data for the selected customer
    const customerToEdit = customers.find((customer) => customer.passengerId === customerId);
    if (customerToEdit) {
      setEditedFields({
        [customerId]: {
          passengerId: customerToEdit.passengerId,
          firstName: customerToEdit.firstName,
          lastName: customerToEdit.lastName,
          contactNumber: customerToEdit.contactNumber,
          address: customerToEdit.address,
          // Add other fields as needed
        },
      });
    }

    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedCustomerId(null);
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

  const handleDelete = async (customerId) => {
    try {
      const response = await fetch(`https://sripass.onrender.com/api/localpassengers/${customerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }
      const responseData = await response.json();
      console.log(responseData.message); // Log the success message
      setCustomers(customers.filter((customer) => customer.passengerId !== customerId));
      closeDeleteDialog();
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleSaveEdit = async (rowId) => {
    try {
      const updatedCustomer = { ...customers.find((customer) => customer.passengerId === rowId), ...editedFields[rowId] };
      const response = await fetch(`https://sripass.onrender.com/api/localpassengers/${rowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomer),
      });
      if (!response.ok) {
        throw new Error('Failed to update customer');
      }
      const updatedCustomers = customers.map((customer) => (customer.passengerId === rowId ? updatedCustomer : customer));
      setCustomers(updatedCustomers);
      closeEditDialog();
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedCustomers = customers.slice(startIndex, endIndex);

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
              {displayedCustomers.map((customer) => (
                <TableRow key={customer.passengerId}>
                  <TableCell>{customer.passengerId}</TableCell>
                  <TableCell>{customer.firstName}</TableCell>
                  <TableCell>{customer.lastName}</TableCell>
                  <TableCell>{customer.contactNumber}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  {/* Add other table cells for additional columns */}
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => openDeleteDialog(customer.passengerId)}
                      style={{ marginRight: '8px' }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditDialog(customer.passengerId)}
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
        count={customers.length}
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
        <DialogTitle id="alert-dialog-title">Delete Customer</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this customer?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deleteCustomerId)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit customer details:</DialogContentText>
          <TextField
            label="Passenger ID"
            value={editedFields[selectedCustomerId]?.passengerId || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedCustomerId, 'passengerId', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="First Name"
            value={editedFields[selectedCustomerId]?.firstName || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedCustomerId, 'firstName', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={editedFields[selectedCustomerId]?.lastName || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedCustomerId, 'lastName', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Number"
            value={editedFields[selectedCustomerId]?.contactNumber || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedCustomerId, 'contactNumber', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={editedFields[selectedCustomerId]?.address || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedCustomerId, 'address', e.target.value)
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
          <Button onClick={() => handleSaveEdit(selectedCustomerId)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CustomerTable;
