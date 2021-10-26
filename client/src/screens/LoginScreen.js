import React, { useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useHistory } from "react-router-dom";


const LoginScreen = ({ setUser }) => {

  let history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true);

    try{
      const config={
        headers:{
            'Content-Type':'application/json'
        }
      }
      const { data }= await axios.post('/api/auth/login',{ email, password },config)
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      setUser(data)
      // console.log(setUser)
      history.push('/')
    }
    catch(e)
    {
      setError(e.response.data);
      setLoading(false);
    }
  }

  return (
    <Container className="my-2">
      <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
      <h1>Log In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New User?{' '}
          <Link to='/register'>
            Register
          </Link>
        </Col>
      </Row>
      </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen