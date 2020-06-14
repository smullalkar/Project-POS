import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Stockcard extends Component {
    render() {
        return (
            <div className="card boder">
                <img src="./inventory.png" className="card-img-top" alt="img"  style={{height:'300px'}}/>
                <div className="card-body">
                    <h5 className="card-title">STOCK</h5>
                    <p className="card-text">Stock Management</p>
                    <Link to="/user/stockinventory" className="btn btn-primary">Go to stock management</Link>
                </div>
            </div>
        )
    }
}
