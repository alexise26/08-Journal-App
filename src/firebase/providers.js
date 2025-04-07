import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from "./config";

const googleProvider =  new GoogleAuthProvider();

export const singInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        
        const {displayName, email, photoURL, uid} = result.user;

        return {
            ok: true,
            //user info:
            displayName, email, photoURL, uid
        }
        

    } catch (error) {
        const errorCode =  error.code;
        const errorMessage =  error.message;

        return{
            ok:false,
            errorMessage
        }
    }

}

export const registerUser = async({email, password, displayName}) => {
  
    try {
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const {uid, photoURL}  = resp.user;

        await updateProfile(firebaseAuth.currentUser, {displayName});

        return{
            ok:true,
            uid, photoURL, email, displayName
        }
        
        
    } catch (error) {
        console.log(error);
        return {ok:false, errorMessage: error.message}
    }
}

export const loginWithEmailAndPassword = async({email, password}) => {
  
    try {

        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const {displayName, photoURL, uid} = resp.user;
        return{
            ok:true,
            uid, photoURL, displayName
        }
        
    } catch (error) {
        console.log(error);
        return {ok:false, errorMessage: error.message}        
    }
}

export const logoutFirebase = async () =>{

    return await firebaseAuth.signOut();
}
