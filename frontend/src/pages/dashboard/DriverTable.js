
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   TableHead,
//   TablePagination,
//   TextField,
//   InputAdornment,
//   Link,
// } from '@mui/material';
// import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button, message } from 'antd';
// import { Link as RouterLink } from 'react-router-dom';
// import Autocomplete from '@mui/material/Autocomplete';

// function DriverTable() {
//   const [driverData, setDriverData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [editMode, setEditMode] = useState({});
//   const [editedFields, setEditedFields] = useState({});
//   // const [loadData, setLoadData] = useState({});
//   // const [loadNoOptions, setLoadNoOptions] = useState({});

//   const key = 'updatable';

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:8070/api/driver/');
//         if (!response.ok) {
//           throw new Error('API request failed');
//         }
//         const data = await response.json();
//         setDriverData(data);
//       } catch (error) {
//         console.error('Error fetching driver data:', error);
//       }
//     };
//     fetchData();

//     // const fetchLoadData = async () => {
//     //   try {
//     //     const response = await fetch('http://localhost:8070/api/load/all');
//     //     if (!response.ok) {
//     //       throw new Error('API request failed');
//     //     }
//     //     const data = await response.json();
//     //     setLoadData(data);

//     //     const options = {};
//     //     data.forEach((load) => {
//     //       options[load.load_no] = load;
//     //     });
//     //     setLoadNoOptions(options);
//     //   } catch (error) {
//     //     console.error('Error fetching load data:', error);
//     //   }
//     // };
//     // fetchLoadData();
//   }, []);

//   const toggleEditMode = (rowId) => {
//     setEditMode((prevEditMode) => ({
//       ...prevEditMode,
//       [rowId]: !prevEditMode[rowId],
//     }));
//   };

//   const handleEditFieldChange = (rowId, fieldId, value) => {
//     setEditedFields((prevEditedFields) => ({
//       ...prevEditedFields,
//       [rowId]: {
//         ...prevEditedFields[rowId],
//         [fieldId]: value,
//       },
//     }));
//   };

//   const handleSaveEdit = async (rowId) => {
//     const editedRow = driverData.find((row) => row.driver_id === rowId);

//     if (editedRow) {
//       try {
//         const updatedRow = { ...editedRow, ...editedFields[rowId] };

//         const response = await fetch(`http://localhost:8070/api/driver/update/${rowId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(updatedRow),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to update data');
//         }

//         setDriverData((prevDriverData) => {
//           const updatedData = prevDriverData.map((data) =>
//             data.driver_id === rowId ? updatedRow : data
//           );
//           return updatedData;
//         });

//         message.open({
//           key,
//           type: 'loading',
//           content: 'Loading...',
//         });
//         setTimeout(() => {
//           message.open({
//             key,
//             type: 'success',
//             content: `Update successful`,
//             duration: 2,
//           });
//         }, 1000);
//         message.config({
//           top: 100,
//           duration: 2,
//           maxCount: 4,
//           rtl: true,
//           prefixCls: 'my-message',
//         });

//         toggleEditMode(rowId);
//       } catch (error) {
//         message.open({
//           key,
//           type: 'loading',
//           content: 'Loading...',
//         });
//         setTimeout(() => {
//           message.open({
//             key,
//             type: 'error',
//             content: `Error updating data`,
//             duration: 2,
//           });
//         }, 1000);
//         message.config({
//           top: 100,
//           duration: 2,
//           maxCount: 4,
//           rtl: true,
//           prefixCls: 'my-message',
//         });
//         console.error('Error updating data:', error);
//       }
//     }
//   };

//   const headCells = [
//     { id: 'driver_id', label: 'Driver ID' },
//     { id: 'name', label: 'Name' },
//     { id: 'tel', label: 'Telephone' },
//     { id: 'address', label: 'Address' },
//     // Add other fields as needed (e.g., 'country', 'state_province', 'licences', 'email', 'load_no')
//     { id: 'assignedRoute', label: 'AssignedRoute' },
//     { id: 'assignedVehicle', label: ' AssignedVehicle' },
//     // { id: 'licences', label: 'Licences' },
//     // { id: 'email', label: 'Email' },
//     // { id: 'load_no', label: 'Load No' },
//     { id: 'actions', label: 'Actions' },
//   ];

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Modify your filter function to search through all fields of each row
//   const filteredData = driverData
//     .filter((row) =>
//       Object.values(row).some((value) =>
//         value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     )
//     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <Box>
//       <div
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           marginTop: '20px',
//           marginBottom: '30px',
//         }}
//       >
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchOutlined />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </div>
//         <Link component={RouterLink} to="/adddriver">
//           <Button type="primary" shape="circle" icon={<PlusOutlined />} />
//         </Link>
//       </div>

//       <TableContainer>
//         <Table aria-labelledby="tableTitle">
//           <TableHead>
//             <TableRow>
//               {headCells.map((headCell) => (
//                 <TableCell key={headCell.id} align="left">
//                   {headCell.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.map((row) => (
//               <TableRow hover role="checkbox" tabIndex={-1} key={row.driver_id}>
//                 {headCells.map((headCell) => (
//                   <TableCell key={headCell.id} align="left">
//                     {headCell.id === 'actions' ? (
//                       editMode[row.driver_id] ? (
//                         <Button
//                           type="primary"
//                           size="small"
//                           onClick={() => handleSaveEdit(row.driver_id)}
//                         >
//                           Save
//                         </Button>
//                       ) : (
//                         <Button
//                           type="link"
//                           size="small"
//                           onClick={() => toggleEditMode(row.driver_id)}
//                         >
//                           Edit
//                         </Button>
//                       )
//                     ) : headCell.id === 'load_no' ? (
//                       <span style={{ color: 'gray' }}>
//                         {editMode[row.driver_id] ? (
//                           <Autocomplete
//                             value={
//                               editedFields[row.driver_id]?.load_no !== undefined
//                                 ? { load_no: editedFields[row.driver_id]?.load_no }
//                                 : { load_no: row.load_no }
//                             }
//                             onChange={(event, newValue) => {
//                               handleEditFieldChange(row.driver_id, 'load_no', newValue?.load_no || '');
//                             }}
//                             options={Object.values(loadNoOptions)}
//                             getOptionLabel={(option) => option.load_no}
//                             renderInput={(params) => (
//                               <TextField
//                                 {...params}
//                                 variant="outlined"
//                                 size="small"
//                                 InputProps={{
//                                   ...params.InputProps,
//                                   endAdornment: null,
//                                 }}
//                               />
//                             )}
//                           />
//                         ) : (
//                           row[headCell.id]
//                         )}
//                       </span>
//                     ) : (
//                       // Render editable or non-editable fields based on editMode
//                       editMode[row.driver_id] ? (
//                         <TextField
//                           value={editedFields[row.driver_id]?.[headCell.id] || row[headCell.id]}
//                           onChange={(e) =>
//                             handleEditFieldChange(row.driver_id, headCell.id, e.target.value)
//                           }
//                         />
//                       ) : (
//                         row[headCell.id]
//                       )
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <TablePagination
//         rowsPerPageOptions={[10, 25, 50]}
//         component="div"
//         count={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Box>
//   );
// }

// export default DriverTable;

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

function DriverTable() {
  const [drivers, setDrivers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDriverId, setDeleteDriverId] = useState(null);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [editedFields, setEditedFields] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  // Rest of your code...


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

  return (
    <div>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
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
              {drivers.map((driver) => (
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
