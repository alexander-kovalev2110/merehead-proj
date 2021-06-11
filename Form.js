import React, { Component } from 'react'

const initialState = {
    id: '',
    name: '',
    surname: '',
    desc: ''
}
class Form extends Component {      // Generating <form> tag for inputting new user
    constructor(props) {
        super(props)
        this.state = initialState       // State of Form component

        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    handleChange = event => {       // Input/Output of a character
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    submitForm = () => {            // Transfer of the entered data for processing to the upper level
        this.props.handleSubmit(this.state)
        this.setState(initialState)
    }

    render() {                      // Form generation
        const { id, name, surname,  desc } = this.state
        return (
            <form>
                <label>Id&nbsp;</label>
                <input
                    type="text"
                    name="id"
                    value={id}
                    onChange={this.handleChange} />
                <label>&nbsp;&nbsp;&nbsp;Name&nbsp;</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange} />
                <label>&nbsp;&nbsp;&nbsp;Surname&nbsp;</label>
                <input
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={this.handleChange} />
                <label>&nbsp;&nbsp;&nbsp;Desc&nbsp;</label>
                <input
                    type="text"
                    name="desc"
                    value={desc}
                    onChange={this.handleChange} />
                <br/><br/>
                <input type="button" value="Submit" onClick={this.submitForm} />
            </form>
        )
    }
}

export default Form
