import React, { Component } from 'react'
import MonthlySales from './MonthlySales'
import AllSales from './AllSales'

export default class Reports extends Component {
    render() {
        return (
            <div className='container'>
                <AllSales className='p-5 mt-5' />
                <hr />
                <MonthlySales className='p-5' />
            </div>
        )
    }
}
