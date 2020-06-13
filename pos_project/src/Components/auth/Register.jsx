import React, { Component } from 'react';
import { registerUser } from '../../Redux/Actions';
import { connect } from "react-redux";

class Register extends Component {
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
        const { registerUser } = this.props
        return (
            <div className='p-5 m-5'>
                <form
                    className='col-4 offset-4'
                    onSubmit={(e) => {
                        e.preventDefault()
                        registerUser(this.state)
                        this.setState({
                            uname: '',
                            address: '',
                            contact: '',
                            email: '',
                            password: ''
                        })
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

const mapStateToProps = state => {
    console.log('Regisetered ?', state.response)
    return {
        response: state.response
    };
};
const mapDispatchToProps = dispatch => {
    return {
        registerUser: a => dispatch(registerUser(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);