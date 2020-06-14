import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Suppliercard extends Component {
    render() {
        return (
            <div className="card boder">
                <img src="./supplier.png" className="card-img-top" alt="img" style={{height:'300px'}}/>
                <div className="card-body">
                    <h5 className="card-title">SUPPLIERS</h5>
                    <p className="card-text">Information about auppliers</p>
                    <Link to="/user/supplier" className="btn btn-primary">Manage suppliers</Link>
                </div>
            </div>
        )
    }
}
