import React, { Component } from 'react';
// import { registerUser } from '../../Redux/Actions';
import { connect } from "react-redux";

class AddStock extends Component {
    constructor(props) {
        super(props)

        this.state = {
            item_name: '',
            ppu: '',
            spu: '',
            qty: '',
            tax: '',
            supplier: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        const { supplierData } = this.props
        return (
            <div className='p-5 m-5'>
                <form
                    className='col-4 offset-4 needs-validation'
                // onSubmit={(e) => {
                //     e.preventDefault()
                //     registerUser(this.state)
                //     this.setState({
                //         item_name: '',
                //         ppu: '',
                //         spu: '',
                //         qty: '',
                //         tax: ''
                //     })
                // }}
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
                    <select
                        class="custom-select"
                        onChange={e =>
                            this.setState({
                                supplier: e.target.value
                            })
                        }
                    >
                        <option selected>Open this select menu</option>
                        {
                            supplierData.data && supplierData.data.map(sup => <option value={sup[1]}>{sup[1]}</option>)
                        }
                    </select>
                    <div className='d-flex justify-content-center'>
                        <button
                            type="submit"
                            className="btn btn-primary"
                        >Submit</button>
                    </div>
                    {/* {
                        response && response === 200 ? <div>REGISTERATION SUCCESSFUL. PLEASE LOGIN</div> : <div></div>
                    } */}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('Addstock ', state.response)
    return {
        supplierData: state.supplierData
    };
};
// const mapDispatchToProps = dispatch => {
//     return {
//         registerUser: a => dispatch(registerUser(a))
//     };
// };
export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(AddStock);