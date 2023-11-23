import { Box, Container, Grid, Paper, createTheme, TextField, Button } from '@mui/material';
import React, { Component, useEffect, useState } from 'react';
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username:"",
        password: "",
      });

    
    const handleInputChange = (e) => {
      console.log(e.target)
        const { name, value } = e.target;
        console.log(name, value)
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          [name]: value,
        }));
      };
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log(credentials)
          const response = await authService.login(credentials);
          console.log("Usuario autenticado:", response);
          console.log(response.payload.rol)
          authService.saveUserData({rol:response.payload.rol, nombre: response.payload.nombre});
          authService.saveToken(response.idToken);
          navigate('/');
         
        } catch (error) {
          console.error("Error al iniciar sesión:", error.message);
         
        }
      };
    


    return (
        <Container maxWidth='sm'>
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{minHeight:'100vh'}}>
                <Grid item>
                    <Paper sx={{padding:"1.2em", borderRadius:"0.5em", backgroundColor:colors.primary[400]}}>
                        <Typography sx={{mt:1, mb:1}} variant="h2" fontWeight="bold" textAlign="center">JVPAYROLL</Typography>
                        <Typography sx={{mt:1, mb:1, color: colors.blueAccent[500]}} variant="h3" textAlign="center">Sign In</Typography>
                        <Box component="form" onSubmit={handleLogin}>
                            <TextField name='username' margin='normal' type='text' fullWidth label="User" sx={{mt:2, mb:1.5}} required onChange={handleInputChange}/>
                            <TextField name='password' margin='normal' type='password' fullWidth label="Password" sx={{mt:1.5, mb:1.5}} required onChange={handleInputChange}/>
                            <Button fullWidth type="submit" variant='contained' sx={{mt:1.5, mb:3, backgroundColor: colors.greenAccent[500]}}>Sign In</Button>
                            <Button component={Link} to="/createAccount" sx={{color: colors.blueAccent[300]}}>
                                Create an account
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
