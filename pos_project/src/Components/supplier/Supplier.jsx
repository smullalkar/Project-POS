import React, { Component } from 'react'
import { getSupplierData, deleteSupplier } from '../../Redux/Actions';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Supplier extends Component {
    componentDidMount = () => {
        const { email } = this.props
        this.props.getSupplierData(email)
    }
    render() {
        const { supplierData, deleteSupplier, email, getSupplierData} = this.props
        return (
            <div className='container m-5'>
                <Link to='/user/supplier/add'>
                    <button className='btn btn-primary'>
                        Add Supplier
                    </button>
                </Link>
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Contact</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            supplierData.data && supplierData.data.map(item => (
                                <tr>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
                                    <td>
                                        <FontAwesomeIcon icon={faTrash}
                                            onClick={() => {
                                                deleteSupplier(item[4])
                                                setTimeout(() => {
                                                    this.props.history.push('/user/supplier');
                                                }, 200);
                                            }
                                        }
                                        />
                                    </td>
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
        supplierData: state.supplierData,
        email: state.loginData.data.email,
        id: state.loginData.data.id
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getSupplierData: a => dispatch(getSupplierData(a)),
        deleteSupplier: a => dispatch(deleteSupplier(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Supplier);