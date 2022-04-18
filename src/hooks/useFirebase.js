import initializeAuthentication from "../Firebase/firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged,signOut,createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { useEffect, useState } from "react";



initializeAuthentication();

const useFirebase = () => {

    const [user,setUser] = useState({});
    const [authError,setAuthError] = useState('');
    const [isLoading,setIsLoading] = useState(true);
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // Google Sign In
    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    
    // email sign up
    const emailSignUp = (email,password,name) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const newUser = {email, displayName: name};
            setUser(newUser);

            // update profile
            updateProfile(auth.currentUser, {
                displayName: name
              }).then(() => {
                // Profile updated!
                // ...
              }).catch((error) => {
                // An error occurred
                // ...
              });
        })
        .catch((error) => {
            
            setAuthError(error.message);
            // ..
        })
        .finally(() => setIsLoading(false));
    }

   // email sign in
   const emailSingIn = (email,password) => {
    return signInWithEmailAndPassword(auth, email, password)
   }


    // Sign Out
    const logOut = () => {   
        return signOut(auth)
    }

    // Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            if(user){
                console.log(user);
                setUser(user);
            }else{
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    },[]);

    return {
        user,
        googleSignIn,
        emailSignUp,
        emailSingIn,
        isLoading,
        logOut,
        authError,
    }
}
export default useFirebase;