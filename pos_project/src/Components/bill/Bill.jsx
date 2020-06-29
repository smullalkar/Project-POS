import React, { Component } from 'react';
import { connect } from "react-redux";
import { geInventorytData, getSupplierData, getCustomerData } from '../../Redux/Actions';

import ItemSelect from './ItemSelect';
import BillItemTable from './BillItemTable';
import BillDisplay from './BillDisplay';
import CustomerDetails from './CustomerDetails';

class Bill extends Component {
    render() {
        const { inventoryData } = this.props
        
        return (
            <div className='container my-5'>
                <CustomerDetails/>
                <ItemSelect />
                <div className='row my-5'>
                    <div className='col-8'>
                        <BillItemTable className='p-4'/>
                    </div>
                    <div className='col-4'>
                        <BillDisplay className='p-4'/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log("state items :", state.bill_items)
    return {
        isLoggedin: state.isLoggedin,
        email: state.loginData.data.email,
        id: state.loginData.data.id
    };
};

export default connect(
    mapStateToProps
)(Bill);