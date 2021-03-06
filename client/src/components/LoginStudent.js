import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class LoginStudent extends Component {

  state = {
      username : '',
      password : '',
      loginSuccess: false
  };

    onChangeUsername = (e) => this.setState({
      username: e.target.value
  });


  onChangePassword = (e) => this.setState({
      password: e.target.value 
  });

  
  onSubmit = (e) => {

    e.preventDefault();

  axios.post('http://localhost:5000/login', { 
    username: this.state.username,
    password: this.state.password
  })
  .then(res => {
    console.log(res.data.token);
    localStorage.setItem('authToken', res.data.token);
    localStorage.setItem('username', res.data.uname);
    alert(`Successfully logged in as ${res.data.uname}...`);
    this.setState({
       loginSuccess: true
    })

  })
  .catch(err => {
    // Authentication failed
    alert(`Login Failed. Try again...`);
  });
 
}

  render() {
    if (this.state.loginSuccess === true){
      return <Redirect to='/add' />
     }

    return (
      <div>
        welcome to login
        <form onSubmit={this.onSubmit}>
            <div>
                <label>Username: </label>
                <input  
                    type="text" 
                    className="form-control"
                    value={this.state.username}
                   onChange={this.onChangeUsername}
                />
            </div>
            <div>
                <label>Password: </label>
                <input  
                    type="password" 
                    className="form-control"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                />
            </div>
            <div className="form-group">
                <input type="submit" value="login" className="btn btn-primary" />               
            </div>
            </form>
      </div>
    )
  }
}

export default LoginStudent;
