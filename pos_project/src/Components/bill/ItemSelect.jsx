import React, { Component } from 'react'
import { connect } from "react-redux";
import { addItemToBill } from '../../Redux/Actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';

class ItemSelect extends Component {
    constructor(props) {
        super(props)

        this.state = {
            stock_id: '',
            qty: 1
        }
    }

    render() {
        const { inventoryData, addItemToBill } = this.props
        const opt = []
        for(let i=0; i<inventoryData.data.length; i++){
            opt.push({label: inventoryData.data[i][2], value: inventoryData.data[i][7]})
        }
        return (
            <div>
                <div>
                    <label>SELECT ITEM : </label>
                    <Select
                        options = {opt}
                        placeholder='Please select an item'
                        onChange={(opt) => this.setState({stock_id: opt.value})}
                    >
                    </Select>
                </div>
                <div className='text-center m-3'>
                    <h4>Qty : {this.state.qty}</h4>
                    <FontAwesomeIcon
                        className='h3 m-2 mx-3'
                        onClick={() =>
                            this.setState({
                                qty: this.state.qty + 1
                            })
                        }
                        icon={faPlusCircle}
                    />
                    {
                        this.state.qty !== 0 ?
                            <FontAwesomeIcon
                                className='h3 m-2 mx-3'
                                onClick={() =>
                                    this.setState({
                                        qty: this.state.qty - 1
                                    })
                                }
                                icon={faMinusCircle}
                            /> :
                            <></>
                    }
                </div>
                <div className='d-flex justify-content-center'>
                    <button
                        className='btn btn-primary'
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