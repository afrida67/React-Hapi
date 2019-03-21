import React, { Component } from 'react'
import axios from 'axios';

class EditStudent extends Component {


    onSubmit = this.onSubmit.bind(this);

    state = {
        username: '',
        name: '',
        email: '',
        password: '',
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/${this.props.match.params.id}`)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password
    
                })
            })
            .catch(function(err) {
                console.log(err)
            })
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
      
        const obj = {
            username: this.state.username,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        };
        axios.post(`http://localhost:5000/update/${this.props.match.params.id}`, obj)
            .then(res => console.log(res.data));
      
        this.props.history.push('/');
      }
      

  render() {
    return (
       <div>
            <h3>Update Student Information</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label>Name </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                    />
                    </div>

                    <div className="form-group">
                        <label>Email </label>
                        <input  type="email"
                                className="form-control"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                    />
                    </div>
                    <div className="form-group">
                        <label>Password </label>
                        <input  type="password"
                                className="form-control"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                    />
                    </div>
               
                     <div className="form-group">
                        <input type="submit" value="Update Informations" className="btn btn-primary" />
                     </div>
            </form>
      </div>
    )
  }
}

export default EditStudent;
