import React, { Component } from 'react'
import { connect } from "react-redux";

class BillDisplay extends Component {
    render() {
        const { bill_items } = this.props
        let bill = 0
        for (let i = 0; i < bill_items.length; i++) {
            bill += (Number(bill_items[i][0][4]) + (Number(bill_items[i][0][4]) * (Number(bill_items[i][0][6]) / 100))) * bill_items[i][1]
        }
        var tempDate = new Date();
        var date = tempDate.getFullYear() + ':' + (tempDate.getMonth() + 1) + ':' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();

        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">TOTAL BILL</h5>
                        <hr />
                        <p className="card-text">Amount in Rs : {parseFloat(bill).toFixed(2)}</p>
                        <button className="btn btn-primary">Generate Invoice</button>
                        <div>{date}</div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bill_items: state.bill_items
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         removeItem: a => dispatch(removeItem(a)),
//     };
// };

export default connect(
    mapStateToProps
    // mapDispatchToProps
)(BillDisplay);