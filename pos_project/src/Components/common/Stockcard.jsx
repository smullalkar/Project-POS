import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Stockcard extends Component {
    render() {
        return (
            <div className="card boder">
                <img src="./inventory.png" className="card-img-top" alt="img"  style={{height:'300px'}}/>
                <div className="card-body">
                    <h5 className="card-title">INVENTORY</h5>
                    <p className="card-text">Inventory and Stock Management</p>
                    <Link to="/user/stockinventory" className="btn btn-primary">Go to invetory management</Link>
                </div>
            </div>
        )
    }
}
