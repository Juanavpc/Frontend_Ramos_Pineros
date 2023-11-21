import { Box, Container, Grid, Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from 'react-router-dom';
import authService from '../../services/authService';

const CreateAccount = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [form, setForm] = useState(
        {
            nombre : '',
            email : '',
            password: '',
            role: '',
        }
    )

    const handleInputChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
    const handleCreateAccount = async (e) => {
        e.preventDefault();
    
        try {
          
          const response = await authService.register({
            nombre: form.nombre,
            email: form.email,
            password: form.password,
            role: form.role,
          });
    
          
          console.log('Registro exitoso:', response);
    
          
          navigate("/login");
        } catch (error) {
          console.error('Error durante el registro:', error);
        }
      };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(form);

        
        setForm({
            nombre: '',
            email: '',
            password: '',
            role: '', 
        });
    }

    return (
        <Container maxWidth='sm'>
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{minHeight:'100vh'}}>
                <Grid item>
                    <Paper sx={{padding:"1.2em", borderRadius:"0.5em", backgroundColor:colors.primary[400]}}>
                        <Typography sx={{mt:1, mb:1}} variant="h2" fontWeight="bold" textAlign="center">JVPAYROLL</Typography>
                        <Typography sx={{mt:1, mb:1, color: colors.blueAccent[500]}} variant="h3" textAlign="center">Sign Up</Typography>
                        <Box component="form" onSubmit={handleCreateAccount}>
                            <TextField name='nombre' margin='normal' type='text' fullWidth label="Name" sx={{mt:2, mb:1.5}} required onChange={handleInputChange} value={form.name}/>
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
                                        <MenuItem value={"administrador"}>Admin</MenuItem>
                                        <MenuItem value={"cortador"}>Cortador</MenuItem>
                                        <MenuItem value={"guarnecedor"}>Guarnecedor</MenuItem>
                                        <MenuItem value={"ensamblador"}>Ensamblador</MenuItem>
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
