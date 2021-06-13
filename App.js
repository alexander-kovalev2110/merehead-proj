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
    desc: '',
    avatar: null
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {            // State initialization
            users: [],            // Array of users received from the server
            user: initialState,   // Current user (input/edit)
            editmode: false       // true - user edit mode; false - user input mode
        }

        this.getUsers()           // Getting users from site
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

    handleChange = event => {       // Input/Output of a character
        const { name, value } = event.target
        let form = this.state.user
        form[name] = value
        this.setState({user: form})
    }

    handleSubmit = () => {            // POST/PUT request. Adding/editing user
        const form = this.state.user
        let url_sub = this.state.editmode ? url + form.id + '/' : url
        url_sub += '?id=' + form.id +
            '&name=' + form.name +
            '&surname=' + form.surname +
            '&desc=' + form.desc +
            '&avatar=' + form.avatar
        const submitmethod = this.state.editmode ? "PUT" : "POST"
        fetch(url_sub, { method: submitmethod })   // POST/PUT request
            .then(response => {
                if (!response.ok) throw Error(response.statusText)
                return response.json()
            })
            .then(data => console.log(data))
            .catch(error => console.log(error))

        this.setState({ user: initialState, editmode: false })
        this.getUsers()
    }

    editUser = index => {               // Switch to edit mode
        this.setState({editmode: true, user: this.state.users[index]})
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
            <Form user={this.state.user} handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit} />
        </div>
    )
  }
}

export default App
