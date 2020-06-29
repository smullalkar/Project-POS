import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class BillDisplay extends Component {

    render() {
        const { bill_items } = this.props
        var bill = 0
        for (let i = 0; i < bill_items.length; i++) {
            bill += (Number(bill_items[i][0][4]) + (Number(bill_items[i][0][4]) * (Number(bill_items[i][0][6]) / 100))) * bill_items[i][1]
        }
        console.log('bill sending state ', this.state)
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">TOTAL BILL</h5>
                        <hr />
                        <p className="card-text">Amount in Rs : {parseFloat(bill).toFixed(2)}</p>
                        <Link to='/user/invoice'><button className="btn btn-primary">Generate Invoice</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('Display bill ', state)
    return {
        bill_items: state.bill_items
    };
};

export default connect(
    mapStateToProps
)(BillDisplay);