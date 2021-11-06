import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth" 

// const db = getFirestore();

const SignUp = ({history}) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        //FOR ROLE, ADD role AFTER PASSWORD
        const {email, password} = event.target.elements;
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email.value, password.value)
            .then((userCredential) => {
                const user = userCredential.user;
                history.push("/");
                
                // return setDoc(doc(db, "users", userCredential.user.uid), {
                //     role: role.value
                // })
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode +"\n"+ errorMessage)
            })
            
    
    }, [history]);

    return(
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    Email
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder="Password" />
                </label>
                
                {/* <label>Role:

                    <select name="role">
                        <option value="admin">Admin</option>
                        <option value="owner">Owner</option>
                    </select>
                </label> */}
                <button type="submit">Sign Up</button>

            </form>
                <br/><br/>
            <a href="/login">Login</a>
            
        </div>
    )
}

export default withRouter(SignUp);