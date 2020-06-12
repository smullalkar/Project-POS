import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar navbar-light bg-light">
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/register'>Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/login'>Login</Link>
                </li>
            </ul>
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success primary my-2 my-sm-0" type="submit">Search</button>
            </form>
        </nav>
    )
}
