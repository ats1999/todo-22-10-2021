import React, {useEffect, useState} from "react";
import app from "./base";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(app);


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const[currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setCurrentUser(user);
                const uid = user.uid;
            } else{
                // alert("User is unavailable")
                
            }
        })
    }, []);
    
    return(
        <AuthContext.Provider
        value={{
            currentUser
        }}
        >
            {children}
        </AuthContext.Provider>
    
    
    );
};