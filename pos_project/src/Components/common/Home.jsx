import React, { Component } from 'react'
import Stockcard from './Stockcard'
import Suppliercard from './Suppliercard'
import Customercard from './Customercard'
import Billgenerator from './Billgenerator'
import ReportCard from './ReportCard'
import { connect } from "react-redux";
import { geInventorytData, getSupplierData, getCustomerData } from '../../Redux/Actions';

class Home extends Component {
    componentDidMount = () => {
        const { email,id } = this.props
        this.props.geInventorytData(email)
        this.props.getSupplierData(email)
    }
    render() {
        const {isLoggedin} = this.props
        if(isLoggedin){
            return (
                <div className='container'>
                    <div className='row my-5'>
                        <div className='col-lg-4 col-md-6 col-sm-12 col-12 mt-3'>
                            <Stockcard />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12 col-12 mt-3'>
                            <Suppliercard />
                        </div>
                        <div className='col-lg-4 col-md-6 col-sm-12 col-12 mt-3'>
                            <Customercard />
                        </div>
                    </div>
                    <div className='m-5'>
                        <Billgenerator />
                    </div>
                    <div className='m-5'>
                        <ReportCard/>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    console.log("state :", state)
    return {
        isLoggedin: state.isLoggedin,
        email: state.loginData.data.email,
        id: state.loginData.data.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        geInventorytData: a => dispatch(geInventorytData(a)),
        getSupplierData: a => dispatch(getSupplierData(a)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);