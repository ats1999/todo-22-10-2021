import React, { useEffect , useState} from 'react'
import axios from 'axios'
import { Container, ListGroup, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Task from '../components/Task'
import Loader from './../components/Loader.js'
import { useHistory } from "react-router-dom";


const HomeScreen = ({user}) => {

    let history = useHistory();
    const [tasks,setTasks]= useState([])
    const [loading,setLoading]= useState(false)
    const [error,setError]= useState(null)
    const [deleteError,setDeleteError]= useState(null)

    useEffect(()=>{

        const fetchTasks=async()=>{
    
             if(!user)
             {
                return history.push('/login')
             }
         
             try{
                 setLoading(true)
                 const config = {
                     headers: {
                         Authorization: `Bearer ${user.token}`,
                     },
                 }
                 const {data} = await axios.get('/api/tasks',config);
                 setLoading(false);
                 setTasks(data);
             }
             catch(e)
             {
                setLoading(false);
                setError(e);
            }
        }
        
        fetchTasks();
    },[history,user])

    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure')) {

            try{
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
                await axios.delete(`/api/task/${id}`,config);
                setTasks((tasks)=>{
                    return tasks.filter((task)=>{
                        return (task._id!==id)
                    })
                })
            }
            catch(e)
            {
                setDeleteError(e.response.data)
            }
        }
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
            <Col md={9} xs={12}>
            <h2>My Tasks</h2>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            {deleteError && <Message variant='danger'>{error}</Message>}
            <ListGroup>
                {
                    tasks.map((task)=>{
                        return <ListGroup.Item key={task._id}> <Task task={task} deleteHandler={deleteHandler}/> </ListGroup.Item>
                    })
                }
            </ListGroup>
            </Col>
            </Row>
        </Container>
    )
}

export default HomeScreen
