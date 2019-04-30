import React, { Component } from 'react';
import axios from 'axios';
import Student from './TableRow';

class StudentList extends Component {
      state = {
        students: []
      };

      logout = () => {
        localStorage.removeItem('authToken','username');
        localStorage.removeItem('username');
        window.location.href = '/';
       };
 
      componentDidMount() {
        axios.get('http://localhost:5000/')
            .then(response => {
                this.setState({students: response.data});
            })
            .catch( (error) => {
                console.log(error);
            });
    }
    studentList() {
      return this.state.students.map((currentStudent, i) => {
          return <Student student={currentStudent} key={i} />;
      });
  }
  render() {
    const isLoggedIn = localStorage.getItem('username');

    return (
      <div className="App">
        <h3>Student List</h3>
         {isLoggedIn}
              <table  id="students">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th >Actions</th>
                            <th></th>

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
