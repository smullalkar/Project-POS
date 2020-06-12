import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            email: ''
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
                        // loginUser(this.state)
                    }}
                >
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
