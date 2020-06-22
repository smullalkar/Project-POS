import React, { Component } from 'react'
import { geInventorytData } from '../../Redux/Actions';
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

class StockInventory extends Component {
    componentDidMount = () => {
        const { email } = this.props
        this.props.geInventorytData(email)
    }
    render() {
        const { inventoryData, match } = this.props
        return (
            <div className='container m-5'>
                <Link to='/user/stockinventory/add'>
                    <button className='btn btn-primary'>
                        Add Item to stocks
                    </button>
                </Link>
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Purchased price/unit</th>
                            <th scope="col">Selling price/unit</th>
                            <th scope="col">Qty</th>
                            <th scope='col'></th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            inventoryData && inventoryData.data.map(item => (
                                <tr key={uuidv4()}>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
                                    <td>{item[4]}</td>
                                    <td>{item[5]}</td>
                                    <td>
                                        <Link to={`${match.url}/delete/${item[7]}`}>
                                            <FontAwesomeIcon icon={faTrash}/>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`${match.url}/edit/${item[7]}`}>
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
    console.log('inventoryData', state.inventoryData)
    return {
        inventoryData: state.inventoryData,
        email: state.loginData.data.email
    };
};
const mapDispatchToProps = dispatch => {
    return {
        geInventorytData: a => dispatch(geInventorytData(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StockInventory);