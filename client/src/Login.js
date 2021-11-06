import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "./Auth";
import app from "./base";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({history}) => {
    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        
        const auth = getAuth(); 
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            history.push("/");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert( errorCode +"\n" + errorMessage)
        })
    
    }, [history]);

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return(
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Email
                    <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
                    <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Login</button>

            </form>
            <br/><br/>
            <a href="/signup">Sign Up</a>

        </div>
    )
}

export default withRouter(Login);