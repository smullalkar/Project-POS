import React, { Component } from 'react'

export default class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uname: '',
            address: '',
            contact: '',
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
            <div className='p-5 m-5'>
                <form
                    className='col-4 offset-4'
                    onSubmit={(e) => {
                        e.preventDefault()
                        //RegisternUser(this.state)
                    }}
                >
                    <div className="form-group">
                        <label>User name</label>
                        <input
                            name='uname'
                            value={this.state.uname}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            name='address'
                            value={this.state.address}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact number</label>
                        <input
                            name='contact'
                            value={this.state.contact}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name='email'
                            value={this.state.email}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
