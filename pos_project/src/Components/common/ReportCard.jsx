import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class ReportCard extends Component {
    render() {
        return (
            <div>
                <div className="card text-center">
                    <div className="card-header">
                        Reports
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Various reports on sales and expenses</h5>
                        <Link to='/user/reports' className="btn btn-primary">See Reports</Link>
                    </div>
                </div>
            </div>
        )
    }
}
