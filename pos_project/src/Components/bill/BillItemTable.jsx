import React, { Component } from 'react'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeItemBill } from '../../Redux/Actions';
import { v4 as uuidv4 } from 'uuid';

class BillItemTable extends Component {
    render() {
        const {bill_items, removeItemBill} = this.props
        console.log('bill items ', bill_items)
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Price/uint</th>
                            <th scope="col">GST</th>
                            <th scope="col">Qty</th>
                            <th scope='col'>Total amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bill_items && bill_items.map(item => (
                                <tr key={uuidv4()}>
                                    <td>{item[0][2]}</td>
                                    <td>{item[0][4]}</td>
                                    <td>{item[0][6]}</td>
                                    <td>{item[1]}</td>
                                    <td>{parseFloat(Number(item[1]) * (Number(item[0][4])+(Number(item[0][4])*(Number(item[0][6])/100)))).toFixed(2)}</td>
                                    <td><FontAwesomeIcon onClick={()=>removeItemBill(item[0][7])} icon={faTrash} /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bill_items: state.bill_items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeItemBill: a => dispatch(removeItemBill(a)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BillItemTable);