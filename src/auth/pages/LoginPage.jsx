import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Grid2, Typography, TextField, Button, Link, Alert } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { startGoogleSignIn, startLoginWithEmailAndPassword } from "../../store/auth/";

const initialValues = {
  email:'',
  password:'',
};

export const LoginPage = () => {

  const { status, errorMessage } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const {email, password, onInputChange} = useForm(initialValues);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();    
    dispatch(startLoginWithEmailAndPassword(email, password));
  }

  const onGoogleSignIn = () => {
     dispatch(startGoogleSignIn(email, password));
  }
  
  
  return (
    
          <AuthLayout title="Login">
            <form onSubmit={ onSubmit } className='animate__animated animate__fadeIn animate__faster'>

              <Grid2 container>
                <Grid2 size= {{xs:12}} sx={{mt:2}}>
                  <TextField label="correo" type="email" placeholer="correo@gmail.com" fullWidth name="email" value={email} onChange={onInputChange}></TextField>
                </Grid2>
              </Grid2>

              <Grid2 container sx={{mt:2}}>
                <Grid2 size= {{xs:12}}>
                  <TextField label="password" type="password" placeholer="Password" fullWidth name="password" value={password} onChange={onInputChange}></TextField>
                </Grid2>
              </Grid2>

              <Grid2 container spacing={2} sx={{mb: 2, mt:1}}>
                {/* start of login button */}
                <Grid2 size= {{xs:12}} display={!!errorMessage ? '' : 'none'}>
                    <Alert severity='error'>{errorMessage}</Alert>
                </Grid2>

                <Grid2 size= {{xs:12, md:6}}>
                  <Button type = "submit" variant="contained" fullWidth disabled={isAuthenticating}>
                    Login
                  </Button>
                </Grid2>
                {/* start of register button */}
                <Grid2 size= {{xs:12, md:6}}>
                  <Button onClick={onGoogleSignIn}  variant="contained" fullWidth disabled={isAuthenticating}>
                    <Google/>
                    <Typography>Google</Typography>
                  </Button>
                </Grid2>

              </Grid2>

              <Grid2 container direction='row' justifyContent='end'>
                  <Link component={RouterLink} color='inherit' to="/auth/register">
                    Crear una cuenta
                  </Link>
              </Grid2>

            </form>
          </AuthLayout>
          

  )
}