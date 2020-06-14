import React, { Component } from 'react'
import { loginUser } from '../../Redux/Actions';
import { connect } from "react-redux";

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            wrong_pass: false
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    componentDidUpdate = () => {
        setTimeout(() => {
            if(this.props.isLoggedin){
                this.props.history.push('/home')
            }
        }, 300)
    }

    render() {
        const { loginUser, history, message, isLoggedin } = this.props
        const {wrong_pass} = this.state
        return (
            <div className='p-5 m-5'>
                <form
                    className='col-4 offset-4'
                    onSubmit={(e) => {
                        e.preventDefault()
                        loginUser(this.state)
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
                            type="password"
                            className="form-control"
                        />
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                    {
                        wrong_pass ? <div>INCORRECT USERNAME OR PASSWORD</div> : <></>
                    }
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('loginData', state)
    return {
        loginData: state.loginData,
        message: state.loginData.message,
        isLoggedin: state.isLoggedin
    };
};
const mapDispatchToProps = dispatch => {
    return {
        loginUser: a => dispatch(loginUser(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);