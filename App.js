import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'

/**
 * Sending the (GET, POST, PUT, DELETE) requests to the site and displaying the received (users) data.
 */

const url = "http://77.120.241.80:8811/api/users/"              // Site address
const initialState = {
    id: '',
    name: '',
    surname: '',
    desc: ''
}

class App extends Component {
    constructor(props) {
        super(props)
        let  edUser = initialState

        this.state = {            // State initialization
            users: [],            // Array of users received from the server
            editmode: false       // Current user edit mode - true; false - user input mode
        }

        this.getUsers()           // Getting users from site

        this.getUsers = this.getUsers.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.editUser = this.editUser.bind(this)
        this.removeUser = this.removeUser.bind(this)
    }


    getUsers = ()  => {                 // GET request. Getting Array of users
        fetch(url)
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({users: data})    // Loading array of users
            })
            .catch(error => {
                console.error(error)
            })
    }

    handleSubmit = form => {            // POST/PUT request. Adding/editing user
        let url_submit = url + '?id=' + form.id +
            '&name=' + form.name +
            '&surname=' + form.surname +
            '&desc=' + form.desc +
            '&avatar=' + form.avatar
        let submitmethod = this.state.editmode ? "PUT" : "POST"
        fetch(url_submit, { method: submitmethod })   // POST request
            .then(response => {
                if (!response.ok) throw Error(response.statusText)
                return response.json()
            })
            .then(data => console.log(data))
            .catch(error => console.log(error))
        this.getUsers()
        this.edUser = initialState
    }

    editUser = index => {               // Switch to edit mode
        this.edUser =  this.state.users[index]
        this.setState({editmode: true})
    }

    removeUser = index => {            // DELETE request. Deleting current user
        let urldelete = url + this.state.users[index].id
        fetch(urldelete, { method: "DELETE" })    // DELETE request
            .then(response => {
                if (!response.ok) throw Error(response.statusText)
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.log(error))
        this.getUsers()
    }

  render() {
    return (
        <div className="container">
            <Table users={this.state.users} removeUser={this.removeUser} editUser={this.editUser} />
            <Form handleSubmit={this.handleSubmit} editMode={this.state.editmode}
                  editUser={this.edUser} />
        </div>
    )
  }
}

export default App
