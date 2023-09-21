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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Use Material-UI icon

function RouteTable() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Define and initialize your data state
    const [data, setData] = useState([]); // Replace with your data structure

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8070/api/busroutes/');
                if (!response.ok) {
                    throw new Error('API request failed');
                }
                const data = await response.json();
                setData(data); // Update the data state with fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []); // Make sure to specify an empty dependency array to fetch data once

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
        { id: 'vehicleNo', label: 'Vehicle No' }, // Correct the typo here
       
    ];

    // Filter data based on the search query
    const filteredData = data.filter((item) =>
        item.RouteNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Box>
            {/* Search and Add Button */}
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
                                    <SearchIcon /> {/* Use Material-UI icon */}
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
                        {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="left">{row.RouteNo}</TableCell>
                                <TableCell align="left">{row.from}</TableCell>
                                <TableCell align="left">{row.to}</TableCell>
                                <TableCell align="left">{row.vehicleNo}</TableCell>
                               
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>

            {/* Pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}

export default RouteTable;
