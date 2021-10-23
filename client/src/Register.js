import React,{useState,useContext} from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import './Register.css';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { CredentialsContext } from './App';
const handleErrors = async (response) => {
  if(!response.ok){
    const {message} = await response.json();
    throw Error(message);
  }
  return response.json();
}
function Register(){
  const [,setcredentials] = useContext(CredentialsContext);
  const [username, setusername]=useState("");
  const [userid, setuserid]=useState("");
  const [password, setpassword]=useState("");
  const [error, seterror]=useState("");
  let history = useHistory();


  const register=(e)=>{
    e.preventDefault();
    fetch(`http://localhost:4000/register`,{
      method: 'POST',
      headers: {"Content-Type":"application/json",
    },
    body: JSON.stringify({
      username,
      userid,
      password,
    }),
  })
  .then(handleErrors)
  .then(()=>{
    setcredentials({username,userid,password})
    history.push("/inbox");
  })
  .catch((error)=>{
    console.log(error);
    seterror(error.message);
  })
};
  return(<div className="registercontainer"  style={{width:"600px", margin:"45px 650px"}}>
    <h1 style={{textAlign:'center'}}>Register</h1>
    <br />
    {error}
    <form onSubmit={register}>
      <input onChange={(e)=>setusername(e.target.value)} placeholder="Enter Full Name" />
      <br />
      <br />
      <input onChange={(e)=>setuserid(e.target.value)} placeholder="Enter Email id" />
      <br />
      <br />
      <input type="password" onChange={(e)=>setpassword(e.target.value)} placeholder="Password" />
      <br />
      <br />
      <button type="submit">Register</button>
    </form>
    </div>
    )
}

export default Register;
