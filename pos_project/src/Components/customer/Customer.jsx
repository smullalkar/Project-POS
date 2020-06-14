import React, { Component } from 'react'
import { connect } from "react-redux";

class Customer extends Component {
    render() {
        const { customerData } = this.props
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
                                    <td>{item[3]}</td>
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
        customerData: state.customerData
    };
};
// const mapDispatchToProps = dispatch => {
//     return {
//         getCustomerData: a => dispatch(getCustomerData(a))
//     };
// };
export default connect(
    mapStateToProps
    // mapDispatchToProps
)(Customer);