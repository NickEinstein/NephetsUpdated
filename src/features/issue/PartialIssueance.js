import React from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, Typography } from '@mui/material';

const PartialIssuance = () => {
  const [formData, setFormData] = React.useState({
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    selectField: '',
  });

  const data = [
    { id: 1, column1: 'Value 1', column2: 'Value 2', column3: 'Value 3', column4: 'Value 4', column5: 'Value 5' , column6: 'Value 5' },
    { id: 2, column1: 'Value 6', column2: 'Value 7', column3: 'Value 8', column4: 'Value 9', column5: 'Value 10', column6: 'Value 5'  },
    // Add more data as needed
  ];


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with formData
  };

  return (
    <div>
        <Typography className='text-center font-bold my-5' variant='h4'>Partial Issueance</Typography>
        <div className=' gap-6'>
            <Card  className='px-8 py-4 w-full bg-black text-white rounded-2xl'>
                 <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                
              <div className='w-2/3 mb-6'>
              <div className='mb-6'>
                <Typography>Pending Release Item</Typography>
                  <FormControl fullWidth>
                    <InputLabel>Select Field</InputLabel>
                    <Select
                      className='bg-white'
                      name="selectField"
                      value={formData.selectField}
                      onChange={handleChange}
                    >
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Select>
                  </FormControl>
              </div>
              <div>
                <Typography>Select Parent Stock</Typography>
                  <FormControl fullWidth>
                    <InputLabel>Select Field</InputLabel>
                    <Select
                      className='bg-white'
                      name="selectField"
                      value={formData.selectField}
                      onChange={handleChange}
                    >
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                    </Select>
                  </FormControl>
              </div>
              <div className='w-2/4 mt-6'>
                <Typography>Quantity</Typography>
                <TextField
                  className='bg-white rounded-full'

                // label="Field 6"
                name="field6"
                value={formData.field6}
                onChange={handleChange}
                fullWidth
              />
              </div>
              </div>
      
             
             
              <div className='flex gap-3 w-full justify-start mt-12'>
                  <Button className='bg-[#2BDF27]' type="submit" variant="contained" color="primary">
                    Process
                  </Button>
              </div>
            </form>
            </Card>
           
        
        </div>
    </div>
  );
};

export default PartialIssuance;
