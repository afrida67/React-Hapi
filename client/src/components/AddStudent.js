import React, { Component } from 'react';
import axios from 'axios';
 class AddStudent extends Component {

    onSubmit = this.onSubmit.bind(this);

    state = {
        username: '',
        unamError: '',
        name: '',
        email: '',
        password: '',
    }

    onChangeUsername = (e) => this.setState({
        username: e.target.value
     });

    onChangeName = (e) => this.setState({
         name: e.target.value 
    });

    onChangeEmail = (e) => this.setState({
        email: e.target.value 
    });

   onChangePassword = (e) => this.setState({
         password: e.target.value 
    });


    onSubmit(e) {
        e.preventDefault();

        console.log(`form submitted: 
        username ${this.state.username} 
        name: ${this.state.name}
        emai: ${this.state.email}
        pass: ${this.state.password}
        `);

        const newStudent = {
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };


    axios.post('/add', newStudent)
    .then(res => {
        axios.defaults.headers.common['Authorization'] = res.token;
        console.log(res.data);
    })
 
        this.setState({
            username: '',
            name: '',
            email: '',
            password: ''
        })

    }
    render() {
        return (
        <div>
            Sign Up as a new Student<br></br>
            <form onSubmit={this.onSubmit}>
            <div>
                <label>Username: </label>
                <input  
                    type="text" 
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    errorText={this.state.unamError}
                />
            </div>
            <div>
                <label>Name: </label>
                <input  
                    type="text" 
                    className="form-control"
                    value={this.state.name}
                    onChange={this.onChangeName}
                />
            </div>
            <div>
                <label>Email: </label>
                <input  
                    type="email" 
                    className="form-control"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
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
                <input type="submit" value="Add Student" className="btn btn-primary" />
            </div>
            </form>
      
        </div>
        )
  }
}

export default AddStudent;
