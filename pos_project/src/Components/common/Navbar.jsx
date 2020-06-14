import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Navbar extends Component {
    render() {
        const { isLoggedin } = this.props
        if (isLoggedin) {
            return (
                <nav className="navbar navbar-light bg-primary d-flex">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-light" to='/home'>Home</Link>
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
        else{
            return(
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

export default connect(
    mapStateToProps
)(Navbar);