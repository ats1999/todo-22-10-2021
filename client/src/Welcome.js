import React,{useContext} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { CredentialsContext } from './App';
function Welcome(){
  const [credentials]=useContext(CredentialsContext);
  return(<Container>

    <h1>  Todo list </h1>
    <Link style={{textDecoration:'none'}} to='/register'><Button variant="contained" color="white">REGISTER</Button></Link>
    <Link style={{textDecoration:'none'}} to='/login'><Button variant="contained" color="white">LOGIN</Button></Link>
    </Container>)
}

export default Welcome;

const Container = styled.div`
width: 100%;
text-align: center;
border-radius: 10px;
border: 2px solid black;
margin:10%;
background-color:black;
box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
h1{
  background-color:white
  ;
  color: black;
  border-radius: 10px;
  width: 100%;
  text-align:center;
  margin: 130px 0px;
  font-size:3rem;
}
Button{
  margin-left:30px;
  margin-right:30px;
  margin-bottom:50px;
}
}
`