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
                    <div className='col-8'>
                        <label>SELECT ITEM : </label>
                        <Select
                            options={opt}
                            placeholder='Please select an item'
                            onChange={(opt) => this.setState({ stock_id: opt.value })}
                        >
                        </Select>
                    </div>
                    <div className='col-4'>
                        <label>ENTER QTY : </label>
                        <br />
                        <input
                            name='qty'
                            placeholder='Enter qty'
                            value={Number(this.state.qty)}
                            onChange={this.handleChange}
                        ></input>
                        <button
                            className='btn btn-primary mx-3'
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