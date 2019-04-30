import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

    delete = () => {
        axios.get(`http://localhost:5000/delete/${this.props.student._id}`)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <tr>
              <td>
                {this.props.student.username}
              </td>
              <td>
                {this.props.student.name}
              </td>
              <td>
                {this.props.student.email}
              </td>
              <td>
              <Link to={`/edit/${this.props.student._id}`}>Edit </Link>
              </td>
              <td>
                <button onClick={this.delete} className="btn btn-danger">Delete</button>
              </td>
            </tr>
        );
      }
    }

export default TableRow;