import React from 'react'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from "react-router-dom"

const Header = ({user,setUser}) => {

  let history = useHistory();
  
    const addTaskHandler=()=>{
      history.push('/addTask')
    }

    const logoutHandler=()=>{
      localStorage.removeItem("user");
      setUser(null);
      history.push('/login')
    }

    return (
        <header>
            <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
              <Container>
                <LinkContainer to='/'>
                  <Navbar.Brand>Tasks App</Navbar.Brand>
                </LinkContainer>
                <div style={{display: 'flex'}}>
                <Button variant="light" className="mx-4" onClick={addTaskHandler}>    
                    Add Task
                </Button>
                  <Nav className='ms-auto'>
                    {user?(<Nav.Link onClick={ logoutHandler }>
                        Log Out
                      </Nav.Link>):
                      (<LinkContainer to='/login'>
                      <Nav.Link>
                        Log In
                      </Nav.Link>
                    </LinkContainer>)
                    }
                  </Nav>
                </div>
              </Container>
            </Navbar>
      </header>
    )
}

export default Header
