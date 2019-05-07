import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import LoginStudent from './components/LoginStudent';

import './App.css';

class App extends Component {
  render() {
    return (
     <Router>
        <div className="App">
            <h1>Student App</h1>
                <Link to="/">List</Link>
                <br></br>
              {/*  <Link to="/add">Add</Link> */}
                <br></br>
                <Link to="/login">Login</Link>
              <Route path="/" exact component={StudentList} />
               <Route path="/add" exact component={AddStudent} /> 
              <Route path="/edit/:id" component={EditStudent} />
              <Route path="/login" component={LoginStudent} />
        </div>
     </Router>
    );
  }
}

export default App;
