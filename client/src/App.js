import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import AddTaskScreen from './screens/AddTaskScreen'

const App = () => {

  const getUserFromStorage= ()=>{
    return JSON.parse(localStorage.getItem('user'))
  }

  const [user,setUser]= useState(getUserFromStorage()?getUserFromStorage():null)

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <Router>
      <Header user={user} setUser={setUser}/>
      <main className='py-3'>
        <Container>

        <Route path='/' exact>
          <HomeScreen  user={user}/>
        </Route>
        <Route path='/login'>
          <LoginScreen setUser={setUser}/>
        </Route>
        <Route path='/register' component={RegisterScreen} user={user}/>
        <Route path='/addTask'>
          <AddTaskScreen user={user}/>
        </Route>
        </Container>
      </main>
    </Router>
  )
}

export default App
