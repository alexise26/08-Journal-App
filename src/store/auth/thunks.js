import { loginWithEmailAndPassword, logoutFirebase, registerUser, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email,password) => {
  return async(dispatch)=> {
    dispatch(checkingCredentials());
  }
}

export const startGoogleSignIn = (email,password) => {
  return async(dispatch)=> {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();
    
    if (!result.ok) return dispatch(logout( result.errorMessage))

    dispatch(login(result));
    
  }
}

export const startCreatingUserWithEmailAndPassword = ({email, password, displayName}) => {
  
  return async(dispatch) =>{

    dispatch(checkingCredentials());

    const  {ok, uid, photoURL, errorMessage} = await registerUser({email, password, displayName});

    if (!ok) return dispatch(logout({errorMessage}))
    
    dispatch(login({uid, displayName, email, photoURL}));
    
  }
}

export const startLoginWithEmailAndPassword = (email, password) => {
  
  return async(dispatch) =>{

    dispatch(checkingCredentials());

    const  {ok, uid, photoURL, displayName, errorMessage} = await loginWithEmailAndPassword({email, password});
    
    if (!ok) return dispatch(logout({errorMessage}))
    
    dispatch(login({uid, displayName, email, photoURL}));
    
  }
}


export const startLogOut= () => {

  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  }
}



// export const startGoogleSignIn = (email,password) => {
//   return async(dispatch)=> {
//     dispatch(checkingCredentials);
//   }
// }
