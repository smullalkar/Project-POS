import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Customercard extends Component {
    render() {
        return (
            <div className="card boder">
                <img src="./customers.png" className="card-img-top" alt="img"  style={{height:'300px'}}/>
                <div className="card-body">
                    <h5 className="card-title">CUSTOMERS</h5>
                    <p className="card-text">Customers Management</p>
                    <Link to="/user/customer" className="btn btn-primary">Go to customer management</Link>
                </div>
            </div>
        )
    }
}
