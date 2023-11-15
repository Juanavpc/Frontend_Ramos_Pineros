import { Box, Container, Grid, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from 'react-router-dom';

const CreateAccount = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [form, setForm] = useState(
        {
            name : '',
            email : '',
            password: '',
            role: '',
        }
    )

    const handleInputChange = (e) =>{
        setForm({...form, [e.target.name]:e.target.value});
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(form);

        // Clear the form fields after submitting
        setForm({
            name: '',
            email: '',
            password: '',
            role: '', // Also reset the role field
        });
    }

    return (
        <Container maxWidth='sm'>
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{minHeight:'100vh'}}>
                <Grid item>
                    <Paper sx={{padding:"1.2em", borderRadius:"0.5em", backgroundColor:colors.primary[400]}}>
                        <Typography sx={{mt:1, mb:1}} variant="h2" fontWeight="bold" textAlign="center">JVPAYROLL</Typography>
                        <Typography sx={{mt:1, mb:1, color: colors.blueAccent[500]}} variant="h3" textAlign="center">Sign Up</Typography>
                        <Box component="form" onSubmit={handleLogin}>
                            <TextField name='name' margin='normal' type='text' fullWidth label="Name" sx={{mt:2, mb:1.5}} required onChange={handleInputChange} value={form.name}/>
                            <TextField name='email' margin='normal' type='email' fullWidth label="Email" sx={{mt:1.5, mb:1.5}} required onChange={handleInputChange} value={form.email}/>
                            <TextField name='password' margin='normal' type='password' fullWidth label="Password" sx={{mt:1.5, mb:1.5}} required onChange={handleInputChange} value={form.password}/>
                            <FormControl sx={{mt:1, mb:1, minWidth: 550 }} size="small">
                                <InputLabel id="demo-select-small-label">Role</InputLabel>
                                    <Select
                                        labelId="demo-select-small-label"
                                        id="demo-select-small"
                                        label="Role"
                                        name='role'
                                        value={form.role}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Admin</MenuItem>
                                        <MenuItem value={20}>Cortador</MenuItem>
                                        <MenuItem value={30}>Guarnecedor</MenuItem>
                                        <MenuItem value={40}>Ensamblador</MenuItem>
                                    </Select>
                            </FormControl>
                            <Button fullWidth type="submit" variant='contained' sx={{mt:1.5, mb:3, backgroundColor: colors.greenAccent[500]}}>Create Account</Button>
                            <Button component={Link} to="/login" sx={{color: colors.blueAccent[300]}}>
                                Log In
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreateAccount;
