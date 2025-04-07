import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Grid2, Typography, TextField, Button, Link, Alert } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { startCreatingUserWithEmailAndPassword } from "../../store/auth/";
import { useForm } from "../../hooks/useForm";



const formData ={
	email:'',
	password: '',
	displayName: ''
}

const formValidations = {
	email:[(value) => value.includes('@'), 'El correo debe de tener una @.'],
	password:[(value) => value.length >= 6 , 'El password debe de tener mas de 6 letras.'],
	displayName:[(value) => value.length >= 1 , 'El nombre es obligatorio.'],
}


export const RegisterPage = () => {

	const dispatch = useDispatch();
	
	const [formSubmitted, setFormSubmitted] = useState(false);

	const {status, errorMessage} = useSelector(state => state.auth);

	const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

	const {formState, displayName, email, password, onInputChange, isFormValid, displayNameValid, emailValid, passwordValid} = useForm(formData, formValidations);
	
	const onSubmit = (event) => {
		event.preventDefault();
		setFormSubmitted(true);

		if( !isFormValid ) return;
		
	  	dispatch(startCreatingUserWithEmailAndPassword(formState));

	}
	


	return (
		
					<AuthLayout title="Login"> 
						<form fullWidth onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>

							<Grid2 container>
								<Grid2 size= {{xs:12}} sx={{mt:2}}>
									<TextField 
									label="Nombre completo" 
									type="text" placeholer="John Doe" 
									name="displayName" value={displayName } 
									onChange={onInputChange} 
									error={ !!displayNameValid && formSubmitted} 
									helperText={displayNameValid} 
									fullWidth>
									</TextField>
								</Grid2>
							</Grid2>

							<Grid2 container>
								<Grid2 size= {{xs:12}} sx={{mt:2}}>

								<TextField 
								label="correo" 
								type="email" 
								placeholer="correo@gmail.com" 
								name="email" value={email} 
								onChange={onInputChange} 
								error={!!emailValid && formSubmitted} 
								helperText={emailValid} 
								fullWidth>
								</TextField>

								</Grid2>
							</Grid2>

							<Grid2 container sx={{mt:2}}>
								<Grid2 size= {{xs:12}}>
									<TextField 
									label="password" 
									type="password" 
									placeholer="Password" 
									name="password" 
									value={password} 
									onChange={onInputChange} 
									error={!!passwordValid && formSubmitted} 
									helperText={passwordValid} 
									fullWidth>
									</TextField>
								</Grid2>
							</Grid2>

							<Grid2 container spacing={2} sx={{mb: 2, mt:1}}>
								{/* start of login button */}
								
								<Grid2 size= {{xs:12}} display={!!errorMessage ? '' : 'none'}>
									<Alert severity='error'>{errorMessage}</Alert>
								</Grid2>

								<Grid2 size= {{xs:12}}>
									<Button variant="contained" type="submit" disabled={!isFormValid || isCheckingAuthentication} fullWidth>
										Crear Cuenta
									</Button>
								</Grid2>

							</Grid2>

							<Grid2 container direction='row' justifyContent='end'>
									<Typography sx={{mr:1}}> ¿Ya tienes una cuenta? </Typography>
									<Link component={RouterLink} color='inherit' to="/auth/login">
										Ingresar
									</Link>
							</Grid2>

						</form>

					</AuthLayout>
					

	)
}