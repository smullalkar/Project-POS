import React, { Component } from 'react'
import { getCustomerData } from '../../Redux/Actions';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Customer extends Component {
    componentDidMount = () => {
        const { email } = this.props
        this.props.getCustomerData(email)
    }
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
                            customerData.data && customerData.data.map(item => (
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('customerData', state.customerData)
    return {
        customerData: state.customerData,
        email: state.loginData.data.email
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getCustomerData: a => dispatch(getCustomerData(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Customer);