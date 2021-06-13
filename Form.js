import React from 'react'

const Form = (props) => {
        const { id, name, surname,  desc } = props.user
        return (
            <form>
                <label>Id&nbsp;</label>
                <input
                    type="text"
                    name="id"
                    value={id}
                    onChange={props.handleChange} />
                <label>&nbsp;&nbsp;&nbsp;Name&nbsp;</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={props.handleChange} />
                <label>&nbsp;&nbsp;&nbsp;Surname&nbsp;</label>
                <input
                    type="text"
                    name="surname"
                    value={surname}
                    onChange={props.handleChange} />
                <label>&nbsp;&nbsp;&nbsp;Desc&nbsp;</label>
                <input
                    type="text"
                    name="desc"
                    value={desc}
                    onChange={props.handleChange} />
                <br/><br/>
                <input type="button" value="Submit" onClick={props.handleSubmit} />
            </form>
        )
}

export default Form
