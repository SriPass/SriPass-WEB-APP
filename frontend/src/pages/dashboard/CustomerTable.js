
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

// function CustomerTable() {
//   const [customerData, setCustomerData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [editMode, setEditMode] = useState({});
//   const [editedFields, setEditedFields] = useState({});
//   const key = 'updatable';

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://sripass.onrender.com/api/localpassengers'); // Updated URL
//         if (!response.ok) {
//           throw new Error('API request failed');
//         }
//         const data = await response.json();
//         setCustomerData(data);
//       } catch (error) {
//         console.error('Error fetching customer data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const toggleEditMode = (passengerId) => {
//     setEditMode((prevEditMode) => ({
//       ...prevEditMode,
//       [passengerId]: !prevEditMode[passengerId],
//     }));
//   };

//   const handleEditFieldChange = (passengerId, fieldId, value) => {
//     setEditedFields((prevEditedFields) => ({
//       ...prevEditedFields,
//       [passengerId]: {
//         ...prevEditedFields[passengerId],
//         [fieldId]: value,
//       },
//     }));
//   };

//   const handleSaveEdit = async (passengerId) => {
//     const editedPassenger = customerData.find((passenger) => passenger.passengerId === passengerId);

//     if (editedPassenger) {
//       try {
//         const updatedPassenger = { ...editedPassenger, ...editedFields[passengerId] };

//         const response = await fetch(`https://sripass.onrender.com/api/localpassengers/${passengerId}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(updatedPassenger),
//         });

//         if (!response.ok) {
//           throw new Error('Failed to update data');
//         }

//         setCustomerData((prevCustomerData) => {
//           const updatedData = prevCustomerData.map((data) =>
//             data.passengerId === passengerId ? updatedPassenger : data
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

//         toggleEditMode(passengerId);
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
//       }
//     }
//   };

//   const filteredCustomerData = customerData.filter((row) =>
//     Object.values(row).some((value) =>
//       value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const headCells = [
//     { id: 'passengerId', label: 'Passenger ID' },
//     { id: 'firstName', label: 'First Name' },
//     { id: 'lastName', label: 'Last Name' },
//     { id: 'contactNumber', label: 'Contact Number' },
//     { id: 'address', label: 'Address' },
//     // Add other fields as needed
//     { id: 'actions', label: 'Actions' },
//   ];

//   return (
//     <Box>
//       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px' }}>
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
//         <Link component={RouterLink} to="/addcustomer">
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
//             {filteredCustomerData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
//               <TableRow
//                 hover
//                 role="checkbox"
//                 tabIndex={-1}
//                 key={row.passengerId}
//               >
//                 {headCells.map((headCell) => (
//                   <TableCell key={headCell.id} align="left">
//                     {headCell.id === 'actions' ? (
//                       editMode[row.passengerId] ? (
//                         <Button
//                           type="primary"
//                           size="small"
//                           onClick={() => handleSaveEdit(row.passengerId)}
//                         >
//                           Save
//                         </Button>
//                       ) : (
//                         <Button
//                           type="link"
//                           size="small"
//                           onClick={() => toggleEditMode(row.passengerId)}
//                         >
//                           Edit
//                         </Button>
//                       )
//                     ) : (
//                       editMode[row.passengerId] ? (
//                         <TextField
//                           value={editedFields[row.passengerId]?.[headCell.id] || row[headCell.id]}
//                           onChange={(e) => handleEditFieldChange(row.passengerId, headCell.id, e.target.value)}
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
//         count={filteredCustomerData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </Box>
//   );
// }

// export default CustomerTable;


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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText, // Import DialogContentText
} from '@mui/material';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import { message } from 'antd';
function CustomerTable() {
  const [customerData, setCustomerData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMode, setEditMode] = useState({});
  const [editedFields, setEditedFields] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const key = 'updatable';

  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sripass.onrender.com/api/localpassengers'); // Updated URL
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setCustomerData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchData();
  }, []);

  const toggleEditMode = (passengerId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [passengerId]: !prevEditMode[passengerId],
    }));
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

  const handleEditClick = (passengerId) => {
    setSelectedCustomerId(passengerId);
    // Load the existing data into editedFields for editing
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [passengerId]: {
        ...customerData.find((customer) => customer.passengerId === passengerId),
      },
    }));
    setEditModalOpen(true);
  };
  
  const handleEditModalClose = () => {
    setSelectedCustomerId(null);
    setEditModalOpen(false);
    // Clear the editedFields state when modal is closed
    setEditedFields({});
  };

  const handleSaveEdit = async (passengerId) => {
    const editedPassenger = customerData.find((passenger) => passenger.passengerId === passengerId);

    if (editedPassenger) {
      try {
        const updatedPassenger = { ...editedPassenger, ...editedFields[passengerId] };

        const response = await fetch(`https://sripass.onrender.com/api/localpassengers/${passengerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedPassenger),
        });

        if (!response.ok) {
          throw new Error('Failed to update data');
        }

        setCustomerData((prevCustomerData) => {
          const updatedData = prevCustomerData.map((data) =>
            data.passengerId === passengerId ? updatedPassenger : data
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

        toggleEditMode(passengerId);
        handleEditModalClose();
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
      }
    }
  };

  const filteredCustomerData = customerData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const headCells = [
    { id: 'passengerId', label: 'Passenger ID' },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'contactNumber', label: 'Contact Number' },
    { id: 'address', label: 'Address' },
    // Add other fields as needed
    { id: 'actions', label: 'Actions' },
  ];

  return (
    <Box>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '20px', marginBottom: '30px' }}>
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
        <Link component={RouterLink} to="/addcustomer">
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
            {filteredCustomerData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={row.passengerId}
              >
                {headCells.map((headCell) => (
                  <TableCell key={headCell.id} align="left">
                    {headCell.id === 'actions' ? (
                      editMode[row.passengerId] ? (
                        <div>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => handleSaveEdit(row.passengerId)}
                          >
                            Save
                          </Button>
                          <Button
                            type="link"
                            size="small"
                            onClick={() => toggleEditMode(row.passengerId)}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          type="link"
                          size="small"
                          onClick={() => handleEditClick(row.passengerId)}
                        >
                          Edit
                        </Button>
                      )
                    ) : (
                      editMode[row.passengerId] ? (
                        <TextField
                          value={editedFields[row.passengerId]?.[headCell.id] || row[headCell.id]}
                          onChange={(e) => handleEditFieldChange(row.passengerId, headCell.id, e.target.value)}
                        />
                      ) : (
                        row[headCell.id]
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
        count={filteredCustomerData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={handleEditModalClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit customer details:</DialogContentText>
          {selectedCustomerId && (
            <div>
              <TextField
                label="First Name"
                value={editedFields[selectedCustomerId]?.firstName || ''}
                onChange={(e) => handleEditFieldChange(selectedCustomerId, 'firstName', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Last Name"
                value={editedFields[selectedCustomerId]?.lastName || ''}
                onChange={(e) => handleEditFieldChange(selectedCustomerId, 'lastName', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Contact Number"
                value={editedFields[selectedCustomerId]?.contactNumber || ''}
                onChange={(e) => handleEditFieldChange(selectedCustomerId, 'contactNumber', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                value={editedFields[selectedCustomerId]?.address || ''}
                onChange={(e) => handleEditFieldChange(selectedCustomerId, 'address', e.target.value)}
                fullWidth
                margin="normal"
              />
              {/* Add other fields as needed */}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleSaveEdit(selectedCustomerId)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CustomerTable;
