import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { getCustomerBill } from '../../Redux/Actions'

class CustomerInvoice extends Component {
    componentDidMount = () => {
        const { getCustomerBill, match } = this.props
        let b_id = match.params.id
        getCustomerBill(b_id)
    }

    render() {
        const { address, organisation, contact, email, customerBill } = this.props
        return (
            <div>
                <div className="container mt-5">
                    <div className="card">
                        <div className="card-header">
                            Invoice
                            {
                                customerBill.data && <strong className='mx-2'>{customerBill.data[0][2]}</strong>
                            }
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
                                    {
                                        customerBill.data &&
                                        <>
                                            <h6 className="mb-3">To:</h6>
                                            <div>
                                                <strong>{customerBill.data[0][4]}</strong>
                                            </div>
                                            <div>Email: {customerBill.data[0][6]}</div>
                                            <div>Phone: {customerBill.data[0][5]}</div>
                                        </>

                                    }
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
                                            customerBill.data && customerBill.data.map((item, index) => (
                                                <tr key={uuidv4()}>
                                                    <td className="center">{index + 1}</td>
                                                    <td className="left strong">{item[7]}</td>
                                                    <td className="left">{item[8]}</td>

                                                    <td className="right">{item[9]}</td>
                                                    <td className="center">{item[10]}</td>
                                                    <td className="right">{parseFloat(Number(item[10]) * (Number(item[8]) + (Number(item[8]) * (Number(item[9]) / 100)))).toFixed(2)}</td>
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
                                                    {
                                                        customerBill.data && <strong>{parseFloat(customerBill.data[0][1]).toFixed(2)}</strong>
                                                    }
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
                            className='btn btn-primary'>
                            Go Back
                    </button>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    console.log('customer bill details', state.customerBill)
    return {
        organisation: state.loginData.data.organisation,
        address: state.loginData.data.address,
        contact: state.loginData.data.contact,
        email: state.loginData.data.email,
        id: state.loginData.data.id,
        customerBill: state.customerBill
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getCustomerBill: a => dispatch(getCustomerBill(a))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerInvoice);