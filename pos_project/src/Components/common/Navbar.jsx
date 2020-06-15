import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { logout } from '../../Redux/Actions';
import { connect } from "react-redux";

class Navbar extends Component {
    render() {
        const { isLoggedin, logout } = this.props
        if (isLoggedin) {
            return (
                <nav className="navbar navbar-light bg-primary d-flex">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to='/home'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                onClick={()=>logout()}
                                className="nav-link text-light" 
                                to='/login'>
                            Logout</Link>
                        </li>
                    </ul>
                </nav>
            )
        }
        else {
            return (
                <nav className="navbar navbar-light bg-primary d-flex">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to='/register'>Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light" to='/login'>Login</Link>
                        </li>
                    </ul>
                </nav>
            )
        }
    }
}

const mapStateToProps = state => {
    console.log("state :", state)
    return {
        isLoggedin: state.isLoggedin
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: a => dispatch(logout(a))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);