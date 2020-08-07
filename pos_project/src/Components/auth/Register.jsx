import React, { Component } from 'react';
import { registerUser } from '../../Redux/Actions';
import { connect } from "react-redux";

class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            organisation: '',
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
            <div className='p-lg-5 p-md-5 p-sm-5 p-5 m-lg-5 m-md-3 m-sm-1 m-1'>
                <form
                    className='col-lg-4 col-md-6 col-sm-8 col-12 offset-lg-4 offset-md-3 offset-sm-2 offset-0 needs-validation' 
                    onSubmit={(e) => {
                        e.preventDefault()
                        registerUser(this.state)
                        this.setState({
                            organisation: '',
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
                            required
                            name='organisation'
                            value={this.state.organisation}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            required
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
                            required
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
                            required
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
                            required
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
                    {/* {
                        response && response === 200 ? <div>REGISTERATION SUCCESSFUL. PLEASE LOGIN</div> : <div></div>
                    } */}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
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