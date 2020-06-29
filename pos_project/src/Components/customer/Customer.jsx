import React, { Component } from 'react'
import { getCustomerData } from '../../Redux/Actions';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from '../Pagination/Pagination';

class Customer extends Component {
    render() {
        const { customerData,match } = this.props
        return (
            <div className='container m-5'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerData.data && customerData.data.data.map(item => (
                                <tr>
                                    <Link to={`${match.url}/${item[5]}`}><td>{item[3]}</td></Link>
                                    <td>{item[4]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[1]}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <Pagination/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('customerData', state.customerData)
    return {
        customerData: state.customerData,
        id: state.loginData.data.id
    };
};

export default connect(
    mapStateToProps
)(Customer);