import React from 'react'
import { Button, Row, Col, Container } from 'react-bootstrap'

const Task = ({ task ,deleteHandler}) => {

    return (
        <Container>
            <Row>
                <Col md={9} xs={12}>
                <div>
                    <span style={{ marginRight: '25px' }}><strong>Description:</strong> {task.description}</span>
                    <span><strong>Priority:</strong> {task.priority}</span>
                </div>
                </Col>
                <Col md={3} xs={12}>
                <Button className="mx-1" onClick={()=>deleteHandler(task._id)}>Delete</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Task
