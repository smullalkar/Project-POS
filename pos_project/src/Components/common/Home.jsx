import React, { Component } from 'react'
import Stockcard from './Stockcard'
import Suppliercard from './Suppliercard'
import Customercard from './Customercard'
import Billgenerator from './Billgenerator'

export default class Home extends Component {
    render() {
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
}
