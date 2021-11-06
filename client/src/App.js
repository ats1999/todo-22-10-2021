import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./Auth";
import Home from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import PrivateRoute from "./PrivateRoute"


function App() {
  return (
    <AuthProvider>
    <Router>
      <PrivateRoute exact path="/" component={Home} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/login" component={Login} />
    </Router>
    </AuthProvider>
  );
}

export default App;
