import React, { Component } from 'react';
import axios from 'axios';

class LoginStudent extends Component {

  onSubmit = this.onSubmit.bind(this);

  state = {
      username: '',
      password: '',
  }

    onChangeUsername = (e) => this.setState({
      username: e.target.value
  });


  onChangePassword = (e) => this.setState({
      password: e.target.value 
  });

  
  onSubmit(e) {
    e.preventDefault();

    console.log(`form submitted: 
    username ${this.state.username} 
    pass: ${this.state.password}
    `);

    const newStudent = {
      username: this.state.username,
      password: this.state.password
  };
  axios.post('http://localhost:5000/login', newStudent)
  .then(res => console.log(res.data));
      this.setState({
          username: '',
          password: ''
      });

}

  render() {
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
                <input type="submit" value="Login" className="btn btn-primary" />
            </div>
            </form>
      </div>
    )
  }
}

export default LoginStudent;