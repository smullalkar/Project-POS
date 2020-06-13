import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Billgenerator extends Component {
    render() {
        return (
            <div>
                <div className="card text-center">
                    <div className="card-header">
                        Bill Generator
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Generate Bills for various customers</h5>
                        <Link to='/user/bill' className="btn btn-primary">Generate Bill</Link>
                    </div>
                </div>
            </div>
        )
    }
}
