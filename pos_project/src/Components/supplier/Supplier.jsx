import React, { Component } from 'react'
import { connect } from "react-redux";

class Supplier extends Component {
    render() {
        const { supplierData } = this.props
        return (
            <div className='container m-5'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            supplierData.data && supplierData.data.map(item => (
                                <tr>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
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
    console.log('supplierData', state.supplierData)
    return {
        supplierData: state.supplierData
    };
};
// const mapDispatchToProps = dispatch => {
//     return {
//         getSupplierData: a => dispatch(getSupplierData(a))
//     };
// };
export default connect(
    mapStateToProps
    // mapDispatchToProps
)(Supplier);