import React, { Component } from 'react'
import { getSupplierData, deleteSupplier } from '../../Redux/Actions';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid';

class Supplier extends Component {
    componentDidMount = () => {
        const { email } = this.props
        getSupplierData(email)
    }
    render() {
        const { supplierData, match } = this.props
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
                                <tr key={uuidv4()}>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
                                    <td>
                                        <Link to={`${match.url}/delete/${item[4]}`}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`${match.url}/edit/${item[0]}`}>
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </Link>
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
        getSupplierData: a => dispatch(getSupplierData(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Supplier);