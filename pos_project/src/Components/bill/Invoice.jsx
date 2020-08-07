import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { addCustomerBill, remove } from '../../Redux/Actions'

class Invoice extends Component {
    constructor(props) {
        super(props)
        this.state = {
            customer_id: '',
            stockitems_and_qty: '',
            user_id: '',
            amount: ''
        }
    }

    componentDidMount = () => {
        const { bill_items, billing_customer, id } = this.props
        let customer_id
        if (billing_customer.length !== 0) {
            customer_id = billing_customer.data[0][0]
        }
        var tempDate = new Date();
        var bill = 0
        for (let i = 0; i < bill_items.length; i++) {
            bill += (Number(bill_items[i][0][4]) + (Number(bill_items[i][0][4]) * (Number(bill_items[i][0][6]) / 100))) * bill_items[i][1]
        }
        function n(n) {
            return n > 9 ? "" + n : "0" + n;
        }
        this.setState({
            amount: bill,
            customer_id: customer_id,
            stockitems_and_qty: bill_items,
            user_id: id,
        })

    }

    handleClick = () => {
        const { addCustomerBill, remove } = this.props
        addCustomerBill(this.state)
        remove()
        setTimeout(() => {
            this.props.history.push('/home')
        }, 300)
    }

    render() {
        const { addCustomerBill, remove, address, organisation, contact, email, billing_customer, bill_items } = this.props
        var tempDate = new Date();
        var date = tempDate.getFullYear() + ':' + (tempDate.getMonth() + 1) + ':' + tempDate.getDate() + ' ' + tempDate.getHours() + ':' + tempDate.getMinutes() + ':' + tempDate.getSeconds();
        return (
            <div>
                <div className="container mt-5">
                    <div className="card">
                        <div className="card-header">
                            Invoice
                            <strong className='mx-2'>{date}</strong>
                            <span className="float-right"> <strong>Status:</strong> Paid</span>
                        </div>
                        <div className="card-body">
                            <div className="row mb-4">
                                <div className="col-sm-6">
                                    <h6 className="mb-3">From:</h6>
                                    <div>
                                        <strong>{organisation}</strong>
                                    </div>
                                    <div>{address}</div>
                                    <div>Email: {email}</div>
                                    <div>Phone: {contact}</div>
                                </div>
                                <div className="col-sm-6">
                                    <h6 className="mb-3">To:</h6>
                                    <div>
                                        <strong>{billing_customer && billing_customer.data[0][1]}</strong>
                                    </div>
                                    <div>Email: {billing_customer && billing_customer.data[0][3]}</div>
                                    <div>Phone: {billing_customer && billing_customer.data[0][2]}</div>
                                </div>
                            </div>
                            <div className="table-responsive-sm">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th className="center">#</th>
                                            <th>Item</th>
                                            <th>Unit Cost</th>
                                            <th className="right">GST</th>
                                            <th className="center">Qty</th>
                                            <th className="right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            bill_items && bill_items.map((item, index) => (
                                                <tr key={uuidv4()}>
                                                    <td className="center">{index + 1}</td>
                                                    <td className="left strong">{item[0][2]}</td>
                                                    <td className="left">{item[0][4]}</td>

                                                    <td className="right">{item[0][6]}</td>
                                                    <td className="center">{item[1]}</td>
                                                    <td className="right">{parseFloat(Number(item[1]) * (Number(item[0][4]) + (Number(item[0][4]) * (Number(item[0][6]) / 100)))).toFixed(2)}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-sm-5">
                                </div>
                                <div className="col-lg-4 col-sm-5 ml-auto">
                                    <table className="table table-clear">
                                        <tbody>
                                            <tr>
                                                <td className="left">
                                                    <strong>Total</strong>
                                                </td>
                                                <td className="right">
                                                    <strong>{parseFloat(this.state.amount).toFixed(2)}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center m-4'>
                    <div>
                        <button
                            onClick={() => this.props.history.goBack()}
                            className='btn btn-primary mx-2'>
                            CANCEL
                        </button>
                        <button
                            onClick={() => {
                                this.handleClick()
                            }}
                            className='btn btn-primary mx-2'>
                            CONFIRM
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    console.log('bill added?', state.billadded)
    return {
        inventoryData: state.inventoryData,
        organisation: state.loginData.data.organisation,
        address: state.loginData.data.address,
        contact: state.loginData.data.contact,
        email: state.loginData.data.email,
        id: state.loginData.data.id,
        billing_customer: state.billing_customer,
        bill_items: state.bill_items,
        customerData: state.customerData,
        supplierData: state.supplierData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addCustomerBill: a => dispatch(addCustomerBill(a)),
        remove: a => dispatch(remove(a))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Invoice);