import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';

import './App.css';

class App extends Component {
  render() {
    return (
     <Router>
        <div className="App">
            <h1>Student App</h1>
            <Link to="/">List</Link>
            <br></br>
            <Link to="/add">Add</Link>

              <Route path="/" exact component={StudentList} />
              <Route path="/add" exact component={AddStudent} />
        </div>
     </Router>
    );
  }
}

export default App;
