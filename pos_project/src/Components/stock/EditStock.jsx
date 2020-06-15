import React, { Component } from 'react';
import { editStock, getSupplierData} from '../../Redux/Actions';
import { connect } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

class EditStock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item_name: '',
            ppu: '',
            spu: '',
            qty: '',
            tax: '',
            supplier: '',
            user_id: '',
            stock_id: '',
            supplier_id: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    componentDidMount = () => {
        const { id, inventoryData, match, email } = this.props
        getSupplierData(email)

        const stock = inventoryData.data.filter(item => {
            return item[7] === Number(match.params.id)
        })

        this.setState({
            item_name: stock[0][2],
            ppu: stock[0][3],
            spu: stock[0][4],
            qty: stock[0][5],
            tax: stock[0][6],
            supplier: stock[0][9],
            user_id: id,
            stock_id: Number(match.params.id),
            supplier_id: stock[0][8]
        })
    }

    render() {
        const { editStock, supplierData } = this.props
        const match_id = this.props.match.params.id
        console.log('Edit state ', this.state)
        return (
            <div className='p-5 m-5'>
                EDIT
                <form
                    className='col-4 offset-4 needs-validation'
                    onSubmit={(e) => {
                        e.preventDefault()
                        editStock(this.state)
                        setTimeout(() => {
                            this.props.history.push('/home');
                        }, 500);
                        this.setState({
                            item_name: '',
                            ppu: '',
                            spu: '',
                            qty: '',
                            tax: '',
                            supplier: '',
                            user_id: '',
                            stock_id: '',
                            supplier_id: ''
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
                            name='supplier_id'
                            value={this.state.supplier_id}
                            onChange={this.handleChange}
                        >
                            <option>Open this select menu</option>
                            {
                                supplierData.data && supplierData.data.map(sup => <option key={uuidv4()} value={sup[0]}>{sup[1]}</option>)
                            }
                        </select>
                    </div>
                    <div className='d-flex justify-content-center my-3'>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >UPDATE</button>
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
    console.log('EditStock ', state.response)
    return {
        inventoryData: state.inventoryData,
        email: state.loginData.data.email,
        id: state.loginData.data.id,
        supplierData: state.supplierData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSupplierData: a => dispatch(getSupplierData(a)),
        editStock: a => dispatch(editStock(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditStock);