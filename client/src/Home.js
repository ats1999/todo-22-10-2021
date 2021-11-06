import React, { useContext, useState } from "react";
import app from "./base";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from "./Auth";

var roleid;

const auth = getAuth(app);
const db = getFirestore();

const Home = () => {
    const {currentUser} = useContext(AuthContext);
    const [roleVar, setRoleVar] = useState(null);
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = getDoc(docRef);
    docSnap.then(doc =>{
        roleid = doc.data().role;
        setRoleVar(roleid);
        const html =`
            <div> ${roleid} </div>
        `;
        
        document.querySelector('#Role').innerHTML = html;
        console.log(doc.data().role);
        
    })


    if(roleVar === 'owner'){
        const char = `
            <div> You are Owner </div>
        `;
        document.querySelector('#RoleChar').innerHTML = char;
    }

    else if(roleVar === 'admin'){
        const char = `
            <div> You are Admin </div>
        `;
        document.querySelector('#RoleChar').innerHTML = char;
    }

    return(
        <>
            <h1>To-do</h1>
            <div style={{fontSize:'40px'}} id="Role"></div>
            <div style={{fontSize:'40px'}} id="RoleChar"></div>
            <button onClick={() => signOut(auth).then(() => {
                window.location.href = '/login';
            })
            .catch((error) => {
                alert("Error")
            })}>Sign Out</button>
        </>
    )
}

export default Home;