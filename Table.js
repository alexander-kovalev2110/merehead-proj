import React, {Component} from "react"

/**
 * Outputting the array of users:
 * - Displaying the table header
 * - Displaying the table body
 * - Displaying the pagination buttons
 */

const TableHeader = () => {         // Table header displaying
    return (
        <thead>
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Desc</th>
            <th scope="col">Delete</th>
            <th scope="col">Edit</th>
        </tr>
        </thead>
    )
}

const TableBody = (props) => {        // Generation of DB-table
    let rows = props.users.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.surname}</td>
                <td>{row.desc}</td>
                <td>
                    <button onClick={() => props.removeUser(index)}>Delete</button>
                </td>
                <td>
                    <button onClick={() => props.editUser(index)}>Edit</button>
                </td>
            </tr>
        )
    })

    // Selecting users from the array to the output page
    const {offset, page} = props
    rows = rows.filter((el, index) => ((index >= offset) && (index < offset + page)))
    return ( <tbody>{rows}</tbody> )
}

const Pagination = (props) => {         // Go to the previous/next page - Buttons: "Previous"/"Next"
    const { pagePrevious, pageNext } = props
    return (
        <div className="column nest">
            <ul className="pager">
                <li><a onClick={pagePrevious}>&#9650;&nbsp;&nbsp;Previous</a></li>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <li><a onClick={pageNext}>&#9660;&nbsp;&nbsp;Next</a></li>
            </ul>
            <br/><br/>
        </div>
    )
}

class Table extends Component {             // Database table displaying
    constructor(props) {
        super(props)
        this.state = {
            offset: 0,      // Page offset on the screen
            page: 5         // Page size
        }
    }

    pageNext = () => {                      // Next page
        let {offset, page} = this.state
        if ((offset + page) < this.props.users.length)
            this.setState({offset: offset + page})
    }

    pagePrevious = () => {                  // Previous page
        let {offset, page} = this.state
        if ((offset - page) >= 0)
            this.setState({offset: offset - page})
    }

    render() {
        return (
            <div className="row">
                <table className="table">
                    <TableHeader />
                    <TableBody users={this.props.users} removeUser={this.props.removeUser}
                               editUser={this.props.editUser} offset={this.state.offset}
                               page={this.state.page} />
                </table>
                <Pagination pageNext={this.pageNext} pagePrevious={this.pagePrevious}/>
            </div>
        )
    }
}

export default Table
