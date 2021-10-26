import axios from 'axios'
import React,{ useState,useEffect } from 'react'
import { Button, Form ,Row, Col, Container} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link, useHistory } from "react-router-dom";

const AddTaskScreen = ({user}) => {
    let history = useHistory();
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState('low')
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const [success,setSuccess]= useState(false)

    useEffect(() => {
      if(!user)
      {
          return history.push('/login')
      }
    }, [user,history])

    const submitHandler =async (e) => {
      e.preventDefault()
      setLoading(true);

      try{
        const config={
          headers:{
            Authorization: `Bearer ${user.token}`
          }
        }
        const { data }= await axios.post('/api/task',{ description , priority },config)
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
    <Container className="my-2">
      <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
      <Link to="/"><Button variant="dark" className="my-3 px-3">back</Button></Link>
      <h1>Add Task</h1>
      {success&& <Message variant='success'>Task Created</Message>}     
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Description</Form.Label>  
          <Form.Control
            as='textarea'
            placeholder='Enter Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
          <Form.Label className="my-2">Priority</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e)=> setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
          </Form.Select>
        </Form.Group>

        <Button type='submit' variant='primary' className="my-2">
          Add
        </Button>
      </Form>
      </Col>
      </Row>
    </Container>
  )
}

export default AddTaskScreen
