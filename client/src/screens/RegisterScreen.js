import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'


const RegisterScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)
  const [success,setSuccess]= useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true);

    try{
      const config={
        headers:{
            'Content-Type':'application/json'
        }
      }
      const { data }= await axios.post('/api/auth/register',{ name, email, password },config)
      setLoading(false);
      setSuccess(data);
    }
    catch(e)
    {
      setError(e.response.data);
      setLoading(false);
    }
  }

  return (
    <>
    {success?(<Message variant="success">{success}</Message>):
        (<Container className="my-2">
          
          <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
          <h1>Sign Up</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

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
              Register
            </Button>
          </Form>

          <Row className='py-3'>
            <Col>
              Have an Account?{' '}
              <Link to='/login'>
                Login
              </Link>
            </Col>
          </Row>
        </Col>
        </Row>
        </Container>)
    }
    </>
  )
}

export default RegisterScreen