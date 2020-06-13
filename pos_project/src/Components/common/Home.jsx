import React, { Component } from 'react'
import Stockcard from './Stockcard'
import Suppliercard from './Suppliercard'
import Customercard from './Customercard'
import Billgenerator from './Billgenerator'
import { connect } from "react-redux";

class Home extends Component {
    render() {
        const {isLoggedin} = this.props
        if(isLoggedin){
            return (
                <div className='container'>
                    <div className='row my-5'>
                        <div className='col-4'>
                            <Stockcard />
                        </div>
                        <div className='col-4'>
                            <Suppliercard />
                        </div>
                        <div className='col-4'>
                            <Customercard />
                        </div>
                    </div>
                    <div className='m-5'>
                        <Billgenerator />
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>PLEASE LOGIN</div>
            )
        }
    }
}

const mapStateToProps = state => {
    console.log("state :", state)
    return {
        isLoggedin: state.isLoggedin,
    };
};

// const mapDispatchToProps = dispatch => {
//     return {
//         loginUser: a => dispatch(loginUser(a)),
//     };
// };

export default connect(
    mapStateToProps
    // mapDispatchToProps
)(Home);