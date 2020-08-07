import React, { Component } from 'react';
import { addItemToStock } from '../../Redux/Actions';
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

class AddStock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item_name: '',
            ppu: '',
            spu: '',
            qty: '',
            tax: '',
            supplier: '',
            user_id: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    componentDidMount = () => {
        const { id } = this.props
        this.setState({
            user_id: id
        })
    }

    render() {
        const { supplierData, addItemToStock } = this.props
        return (
            <div className='p-5 m-5'>
                <form
                    className='col-4 offset-4 needs-validation'
                    onSubmit={(e) => {
                        e.preventDefault()
                        addItemToStock(this.state)
                        setTimeout(() => {
                            this.props.history.push('/user/stockinventory');
                        }, 200);
                        this.setState({
                            item_name: '',
                            ppu: '',
                            spu: '',
                            qty: '',
                            tax: '',
                            supplier: '',
                            user_id: ''
                        })
                    }}
                >
                    <div className="form-group">
                        <label>Item Name</label>
                        <input
                            required
                            name='item_name'
                            value={this.state.item_name}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Purchased price per unit</label>
                        <input
                            required
                            name='ppu'
                            value={this.state.ppu}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Selling price per unit</label>
                        <input
                            required
                            name='spu'
                            value={this.state.spu}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input
                            required
                            name='qty'
                            value={this.state.qty}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>tax</label>
                        <input
                            required
                            name='tax'
                            value={this.state.tax}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <select
                            className="custom-select"
                            onChange={e =>
                                this.setState({
                                    supplier: e.target.value
                                })
                            }
                        >
                            <option defaultValue>Open this select menu</option>
                            {
                                supplierData.data && supplierData.data.map(sup => <option key={sup[0]} value={sup[0]}>{sup[1]}</option>)
                            }
                        </select>
                    </div>
                    <div className='d-flex justify-content-center my-3'>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >ADD</button>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button
                            onClick={(e) => {
                                this.props.history.goBack()
                            }}
                            type='button'
                            className="btn btn-primary"
                        >CANCEL</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('Addstock ', state.response)
    return {
        supplierData: state.supplierData,
        email: state.loginData.data.email,
        id: state.loginData.data.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addItemToStock: a => dispatch(addItemToStock(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddStock);