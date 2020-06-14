import React, { Component } from 'react';
import { addSupplier, getSupplierData } from '../../Redux/Actions';
import { connect } from "react-redux";

class Addsupplier extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            address: '',
            contact: '',
            user_id: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    componentDidMount = () => {
        const { id, email } = this.props
        this.props.getSupplierData(email)
        this.setState({
            user_id: id
        })
    }

    render() {
        const { addSupplier } = this.props
        return (
            <div className='p-5 m-5'>
                <form
                    className='col-4 offset-4 needs-validation'
                    onSubmit={(e) => {
                        e.preventDefault()
                        addSupplier(this.state)
                        setTimeout(() => {
                            this.props.history.push('/user/supplier');
                        }, 200);
                        this.setState({
                            name: '',
                            address: '',
                            contact: '',
                            user_id: ''
                        })
                    }}
                >
                    <div className="form-group">
                        <label>Supplier Name</label>
                        <input
                            required
                            name='name'
                            value={this.state.name}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            required
                            name='address'
                            value={this.state.address}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Contact</label>
                        <input
                            required
                            name='contact'
                            value={this.state.contact}
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                        />
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
    console.log('Addsupplier ', state.response)
    return {
        id: state.loginData.data.id,
        supplierData: state.supplierData,
        email: state.loginData.data.email
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addSupplier: a => dispatch(addSupplier(a)),
        getSupplierData: a => dispatch(getSupplierData(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Addsupplier);