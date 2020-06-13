import React, { Component } from 'react'
import { geInventorytData } from '../../Redux/Actions';
import { connect } from "react-redux";

class StockInventory extends Component {
    componentDidMount = () => {
        const { email } = this.props
        this.props.geInventorytData(email)
    }
    render() {
        const { inventoryData } = this.props
        return (
            <div className='container m-5'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Item Name</th>
                            <th scope="col">Purchased price/unit</th>
                            <th scope="col">Selling price/unit</th>
                            <th scope="col">Qty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            inventoryData.data && inventoryData.data.map(item => (
                                <tr>
                                    <td>{item[2]}</td>
                                    <td>{item[3]}</td>
                                    <td>{item[4]}</td>
                                    <td>{item[5]}</td>
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