import React, { Component } from 'react';
import axios from 'axios';
class StudentList extends Component {

 
  componentDidMount() {
    axios.get('http://localhost:5000/')
        .then(response => {
            this.setState({todos: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })
}
  render() {
    return (
      <div>
        Welcome to student list
      </div>
    )
  }
}

export default StudentList;
