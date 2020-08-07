import React, { Component } from 'react';
import { connect } from "react-redux";
import { removeAllItemBill } from '../../Redux/Actions';

import ItemSelect from './ItemSelect';
import BillItemTable from './BillItemTable';
import BillDisplay from './BillDisplay';
import CustomerDetails from './CustomerDetails';

class Bill extends Component {

    // componentDidMount = () => {
    //     this.props.removeAllItemBill()
    // }

    render() {
        const { inventoryData,   } = this.props
        
        return (
            <div className='container my-5'>
                <CustomerDetails/>
                <ItemSelect />
                <div className='row my-5'>
                    <div className='col-12 col-sm-12 col-md-8 col-lg-8 mt-4'>
                        <BillItemTable className='p-4'/>
                    </div>
                    <div className='col-12 col-sm-12 col-md-4 col-lg-4 mt-4'>
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
        id: state.loginData.data.id,
        // bill_items: state.bill_items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        removeAllItemBill: () => dispatch(removeAllItemBill())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bill);