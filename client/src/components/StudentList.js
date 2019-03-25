import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Student = props => (
  <tr>
      <td>{props.student.username}</td>
      <td>{props.student.name}</td>
      <td>{props.student.email}</td>
      <td>
          <Link to={`/edit/${props.student._id}`}>Edit</Link>
      </td>
  </tr>
)
class StudentList extends Component {
      state = {
        students: []
      };
 
      logout = () => {
        localStorage.removeItem('authToken');
        window.location.href = '/';
         
       };
 
      componentDidMount() {
        axios.get('http://localhost:5000/')
            .then(response => {
                this.setState({students: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    studentList() {
      return this.state.students.map((currentStudent, i) => {
          return <Student student={currentStudent} key={i} />;
      });
  }
  render() {
    return (
      <div className="App">
        <h3>Student List</h3>
              <table  id="students">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.studentList() }
                    </tbody>
              </table>
              <br></br>
         <div className="form-group">
            <button className="btn btn-primary" onClick={this.logout}>Logout</button>
          </div> 
      </div>
    )
  }
}

export default StudentList;
