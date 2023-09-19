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
} from '@mui/material';
import { Button, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Link as RouterLink } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';

function ContactTable() {
  const [contactData, setContactData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editMode, setEditMode] = useState({});
  const [editedFields, setEditedFields] = useState({});
  const [loadData, setLoadData] = useState({});
  const [customerData, setCustomerData] = useState([]);
  const [shipperData, setShipperData] = useState([]);
  const [consigneData, setConsigneData] = useState([]);
  const [carrierData, setCarrierData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  const key = 'updatable';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/contact/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setContactData(data);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };
    fetchData();

    const fetchLoadData = async () => {
      try {
        const response = await fetch('http://15.156.146.25:8070/api/load/all');
        if (!response.ok) {
          throw new Error('API request failed');
        }
        const data = await response.json();
        setLoadData(data);
      } catch (error) {
        console.error('Error fetching load data:', error);
      }
    }; // Fetch customer data
    const fetchCustomerData = async () => {
      try {
        const customerResponse = await fetch('http://15.156.146.25:8070/api/customer/all');
        if (!customerResponse.ok) {
          throw new Error('API request failed');
        }
        const customerData = await customerResponse.json();
        setCustomerData(customerData);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    
    // Fetch shipper data
    const fetchShipperData = async () => {
      try {
        const shipperResponse = await fetch('http://15.156.146.25:8070/api/shipper/all');
        if (!shipperResponse.ok) {
          throw new Error('API request failed');
        }
        const shipperData = await shipperResponse.json();
        setShipperData(shipperData);
      } catch (error) {
        console.error('Error fetching shipper data:', error);
      }
    };

    // Fetch consigne data
    const fetchConsigneData = async () => {
      try {
        const consigneResponse = await fetch('http://15.156.146.25:8070/api/consigne/all');
        if (!consigneResponse.ok) {
          throw new Error('API request failed');
        }
        const consigneData = await consigneResponse.json();
        setConsigneData(consigneData);
      } catch (error) {
        console.error('Error fetching consigne data:', error);
      }
    };

    // Fetch carrier data
    const fetchCarrierData = async () => {
      try {
        const carrierResponse = await fetch('http://15.156.146.25:8070/api/carrier/all');
        if (!carrierResponse.ok) {
          throw new Error('API request failed');
        }
        const carrierData = await carrierResponse.json();
        setCarrierData(carrierData);
      } catch (error) {
        console.error('Error fetching carrier data:', error);
      }
    };

    // Fetch expense data
    const fetchExpenseData = async () => {
      try {
        const expenseResponse = await fetch('http://15.156.146.25:8070/api/expense/all');
        if (!expenseResponse.ok) {
          throw new Error('API request failed');
        }
        const expenseData = await expenseResponse.json();
        setExpenseData(expenseData);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };
    // Call all data fetching functions
    fetchCustomerData();
    fetchShipperData();
    fetchConsigneData();
    fetchCarrierData();
    fetchExpenseData();
    fetchLoadData();
  }, []);

  const toggleEditMode = (rowId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [rowId]: !prevEditMode[rowId],
    }));
  };

  const handleEditFieldChange = (rowId, fieldId, value) => {
    // Update the edited fields object, including empty values
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [rowId]: {
        ...prevEditedFields[rowId],
        [fieldId]: value,
      },
    }));
  };

  const handleSaveEdit = async (rowId) => {
    const editedRow = contactData.find((row) => row.contact_id === rowId);

    if (editedRow) {
      try {
        const updatedRow = { ...editedRow, ...editedFields[rowId] };

        const response = await fetch(`http://15.156.146.25:8070/api/contact/update/${rowId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRow),
        });

        if (!response.ok) {
          throw new Error('Failed to update data');
        }

        setContactData((prevContactData) => {
          const updatedData = prevContactData.map((data) =>
            data.contact_id === rowId ? updatedRow : data
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
        message.config({
          top: 100,
          duration: 2,
          maxCount: 4,
          rtl: true,
          prefixCls: 'my-message',
        });

        toggleEditMode(rowId);
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
        message.config({
          top: 100,
          duration: 2,
          maxCount: 4,
          rtl: true,
          prefixCls: 'my-message',
        });
      }
    }
  };

  const filteredContactData = contactData.filter((row) =>
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
    { id: 'contact_id', label: 'Contact ID' },
    { id: 'contact', label: 'Contact' },
    { id: 'tel', label: 'Tel' },
    { id: 'ext', label: 'Ext' },
    { id: 'email', label: 'Email' },
    { id: 'payment_terms', label: 'Payment Terms' },
    { id: 'mc', label: 'MC' },
    { id: 'd_o_t', label: 'D.O.T' },
    { id: 'customer_id', label: 'Customer ID' },
    { id: 'shipper_id', label: 'Shipper ID' },
    { id: 'consigne_id', label: 'Consigne ID' },
    { id: 'carrier_id', label: 'Carrier ID' },
    { id: 'load_no', label: 'Load No' },
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
        <Link component={RouterLink} to="/addcontact">
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
  {filteredContactData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.contact_id}
    >
      {headCells.map((headCell) => (
        <TableCell key={headCell.id} align="left">
          {headCell.id === 'actions' ? (
            editMode[row.contact_id] ? (
              <Button
                type="primary"
                size="small"
                onClick={() => handleSaveEdit(row.contact_id)}
              >
                Save
              </Button>
            ) : (
              <Button
                type="link"
                size="small"
                onClick={() => toggleEditMode(row.contact_id)}
              >
                Edit
              </Button>
            )
          ) : headCell.id === 'contact_id' ? (
            row[headCell.id] // Display the value without an input field
          ) : headCell.id === 'customer_id' || headCell.id === 'shipper_id' || headCell.id === 'consigne_id' || headCell.id === 'carrier_id' || headCell.id === 'load_no' ? (
            <span style={{ color: 'gray' }}>
              {editMode[row.contact_id] ? (
                <Autocomplete
                  value={
                    editedFields[row.contact_id]?.[headCell.id] !== undefined
                      ? { [headCell.id]: editedFields[row.contact_id]?.[headCell.id] }
                      : { [headCell.id]: row[headCell.id] }
                  }
                  onChange={(event, newValue) => {
                    handleEditFieldChange(row.contact_id, headCell.id, newValue ? newValue[headCell.id] : '');
                  }}
                  options={
                    headCell.id === 'load_no'
                      ? Object.values(loadData)
                      : headCell.id === 'customer_id'
                      ? Object.values(customerData)
                      : headCell.id === 'shipper_id'
                      ? Object.values(shipperData)
                      : headCell.id === 'consigne_id'
                      ? Object.values(consigneData)
                      : headCell.id === 'carrier_id'
                      ? Object.values(carrierData)
                      : headCell.id === 'expense_id'
                      ? Object.values(expenseData)
                      : []
                  }
                  getOptionLabel={(option) => option[headCell.id] || ''}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: null,
                      }}
                    />
                  )}
                />
              ) : (
                row[headCell.id]
              )}
            </span>
          ) : (
            editMode[row.contact_id] ? (
              <TextField
                value={editedFields[row.contact_id]?.[headCell.id] || row[headCell.id]}
                onChange={(e) => handleEditFieldChange(row.contact_id, headCell.id, e.target.value)}
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
        count={filteredContactData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default ContactTable;
