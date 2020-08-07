import React, { Component } from 'react'
import { connect } from "react-redux";
import { addItemToBill } from '../../Redux/Actions';
import Select from 'react-select';

class ItemSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stock_id: '',
            qty: 1
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        const { inventoryData, addItemToBill } = this.props
        const opt = []
        for (let i = 0; i < inventoryData.data.length; i++) {
            opt.push({ label: inventoryData.data[i][2], value: inventoryData.data[i][7] })
        }
        return (
            <div>
                <div className='row'>
                    <div className='mt-3 col-12 col-sm-12 col-md-6 col-lg-8'>
                        <label>SELECT ITEM : </label>
                        <Select
                            className='mt-3'
                            options={opt}
                            placeholder='Please select an item'
                            onChange={(opt) => this.setState({ stock_id: opt.value })}
                        >
                        </Select>
                    </div>
                    <div className='mt-3 col-12 col-sm-12 col-md-6 col-lg-4'>
                        <label>ENTER QTY : </label>
                        <br />
                        <input
                            className='col-12 col-sm-12 col-md-6 col-lg-6'
                            name='qty'
                            placeholder='Enter qty'
                            value={Number(this.state.qty)}
                            onChange={this.handleChange}
                        ></input>
                        <button
                            className='col-12 col-sm-12 col-md-4 col-lg-4 btn btn-primary m-lg-3 m-md-3 mt-sm-3 mt-3'
                            onClick={() =>
                                (
                                    addItemToBill(this.state),
                                    this.setState({
                                        stock_id: '',
                                        qty: 1
                                    })
                                )
                            }
                        >
                            ADD
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        inventoryData: state.inventoryData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addItemToBill: a => dispatch(addItemToBill(a)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ItemSelect);