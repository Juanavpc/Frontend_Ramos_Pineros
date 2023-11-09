import { Box, Container, Grid, Paper, createTheme, TextField, Button } from '@mui/material';
import React, { Component, useState } from 'react';
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from 'react-router-dom';

const Login = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [form, setForm] = useState(
        {
            username : '',
            password : '',
            redirecToDashboard: false,
        }
    )

    const handleInputChange = (e) =>{
        setForm({...form, [e.target.name]:e.target.value});
    }

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(form);
        setForm({redirecToDashboard:true});
    }

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
