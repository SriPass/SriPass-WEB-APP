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

function TravelHistoryTable() {
  const [travelHistory, setTravelHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://sripass.onrender.com/api/travelhistory/');
        if (!response.ok) {
          throw new Error('Failed to fetch travel history data');
        }
        const data = await response.json();
        setTravelHistory(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching travel history data:', error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  // Function to handle the delete action
  const handleDelete = async (recordId) => {
    try {
      const response = await fetch(`https://sripass.onrender.com/api/travelhistory/${recordId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete travel history record');
      }

      // Remove the deleted record from the local state
      setTravelHistory((prevTravelHistory) => prevTravelHistory.filter((record) => record._id !== recordId));
    } catch (error) {
      console.error('Error deleting travel history record:', error);
    }
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Group the travel history records by Passenger ID
  const groupedTravelHistory = travelHistory.reduce((grouped, record) => {
    const passengerID = record.PassengerID;
    if (!grouped[passengerID]) {
      grouped[passengerID] = [];
    }
    grouped[passengerID].push(record);
    return grouped;
  }, {});

  // Sort the keys (Passenger IDs) in ascending order
  const sortedPassengerIDs = Object.keys(groupedTravelHistory).sort();

  // Flatten the grouped data into an array for display
  const displayedTravelHistory = sortedPassengerIDs.flatMap((passengerID) => {
    return groupedTravelHistory[passengerID];
  });

  // Filter the displayed data based on the search term
  const filteredTravelHistory = displayedTravelHistory.filter((record) =>
    record.PassengerID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search Passenger ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
        margin="normal"
        variant="outlined"
      />

      {isLoading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="200px" // Adjust the height as needed
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} style={{ boxShadow: 'none' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Passenger ID</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Distance</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Route Number</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTravelHistory.slice(startIndex, endIndex).map((record) => (
                <TableRow key={record._id}>
                  <TableCell>{record.PassengerID}</TableCell>
                  <TableCell>{record.duration}</TableCell>
                  <TableCell>{record.distance}</TableCell>
                  <TableCell>{record.cost}</TableCell>
                  <TableCell>{record.RouteNo}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(record._id)} // Call handleDelete with record ID
                      style={{ marginRight: '8px' }}
                    >
                      Delete
                    </Button>
                    {/* <Button
                      variant="outlined"
                      color="primary"
                      // Implement edit function here
                    >
                      Edit
                    </Button> */}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={filteredTravelHistory.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </div>
  );
}

export default TravelHistoryTable;
