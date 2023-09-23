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

function InspectorTable() {
  const [inspectors, setInspectors] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteInspectorId, setDeleteInspectorId] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedInspectorId, setSelectedInspectorId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://sripass.onrender.com/api/busInspectors/');
        if (!response.ok) {
          throw new Error('Failed to fetch inspector data');
        }
        const data = await response.json();
        setInspectors(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching inspector data:', error);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const openDeleteDialog = (inspectorId) => {
    setDeleteInspectorId(inspectorId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteInspectorId(null);
    setDeleteDialogOpen(false);
  };

  const openEditDialog = (inspectorId) => {
    setSelectedInspectorId(inspectorId);

    // Populate editedFields with the existing data for the selected inspector
    const inspectorToEdit = inspectors.find((inspector) => inspector._id === inspectorId);
    if (inspectorToEdit) {
      setEditedFields({
        [inspectorId]: {
          inspectorId: inspectorToEdit.inspectorId,
          name: inspectorToEdit.name,
          email: inspectorToEdit.email,
          phoneNumber: inspectorToEdit.phoneNumber,
          assignedRoute: inspectorToEdit.assignedRoute,
          assignedVehicleNo: inspectorToEdit.assignedVehicleNo,
        },
      });
    }

    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setSelectedInspectorId(null);
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

  const handleDelete = async (inspectorId) => {
    try {
      const response = await fetch(`https://sripass.onrender.com/api/busInspectors/${inspectorId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete inspector');
      }
      const responseData = await response.json();
      console.log(responseData.message); // Log the success message
      setInspectors(inspectors.filter((inspector) => inspector._id !== inspectorId)); // Use _id for comparison
      closeDeleteDialog();
    } catch (error) {
      console.error('Error deleting inspector:', error);
    }
  };

  const handleSaveEdit = async (rowId) => {
    try {
      const updatedInspector = { ...inspectors.find((inspector) => inspector.inspectorId === rowId), ...editedFields[rowId] };
      const response = await fetch(`https://sripass.onrender.com/api/busInspectors/${rowId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInspector),
      });
      if (!response.ok) {
        throw new Error('Failed to update inspector');
      }
      const updatedInspectors = inspectors.map((inspector) => (inspector.inspectorId === rowId ? updatedInspector : inspector));
      setInspectors(updatedInspectors);
      closeEditDialog();
    } catch (error) {
      console.error('Error updating inspector:', error);
    }
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const displayedInspectors = inspectors.slice(startIndex, endIndex);

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Inspector ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Assigned Route</TableCell>
                <TableCell>Assigned Vehicle No</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedInspectors.map((inspector) => (
                <TableRow key={inspector.inspectorId}>
                  <TableCell>{inspector.inspectorId}</TableCell>
                  <TableCell>{inspector.name}</TableCell>
                  <TableCell>{inspector.email}</TableCell>
                  <TableCell>{inspector.phoneNumber}</TableCell>
                  <TableCell>{inspector.assignedRoute}</TableCell>
                  <TableCell>{inspector.assignedVehicleNo}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => openDeleteDialog(inspector._id)}
                      style={{ marginRight: '8px' }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => openEditDialog(inspector.inspectorId)}
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
        count={inspectors.length}
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
        <DialogTitle id="alert-dialog-title">Delete Inspector</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this inspector?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(deleteInspectorId)} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Inspector</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit inspector details:</DialogContentText>
          <TextField
            label="Inspector ID"
            value={editedFields[selectedInspectorId]?.inspectorId || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedInspectorId, 'inspectorId', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            value={editedFields[selectedInspectorId]?.name || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedInspectorId, 'name', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={editedFields[selectedInspectorId]?.email || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedInspectorId, 'email', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={editedFields[selectedInspectorId]?.phoneNumber || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedInspectorId, 'phoneNumber', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Assigned Route"
            value={editedFields[selectedInspectorId]?.assignedRoute || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedInspectorId, 'assignedRoute', e.target.value)
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Assigned Vehicle No"
            value={editedFields[selectedInspectorId]?.assignedVehicleNo || ''}
            onChange={(e) =>
              handleEditFieldChange(selectedInspectorId, 'assignedVehicleNo', e.target.value)
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSaveEdit(selectedInspectorId)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InspectorTable;
