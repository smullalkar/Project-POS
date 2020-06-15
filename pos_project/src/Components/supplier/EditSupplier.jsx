import React, { Component } from 'react';
import { editSupplier, getSupplierData } from '../../Redux/Actions';
import { connect } from "react-redux";

class EditSupplier extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            address: '',
            contact: '',
            user_id: '',
            supplier_id:''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    componentDidMount = () => {

        const { id, supplierData, match, email } = this.props
        getSupplierData(email)

        const sup = supplierData.data.filter(item => {
            return item[0] === Number(match.params.id)
        })
        // s.id, s.name, s.address, s.contact, us.id
        this.setState({
            name: sup[0][1],
            address: sup[0][2],
            contact: sup[0][3],
            user_id: id,
            supplier_id: sup[0][0]
        })
    }

    render() {
        const { editSupplier } = this.props
        return (
            <div className='p-5 m-5'>
                <form
                    className='col-4 offset-4 needs-validation'
                    onSubmit={(e) => {
                        e.preventDefault()
                        editSupplier(this.state)
                        setTimeout(() => {
                            this.props.history.push('/home');
                        }, 200);
                        this.setState({
                            name: '',
                            address: '',
                            contact: '',
                            user_id: '',
                            supplier_id: ''
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
    console.log('editsupplier ', state.response)
    return {
        id: state.loginData.data.id,
        supplierData: state.supplierData,
        email: state.loginData.data.email
    };
};

const mapDispatchToProps = dispatch => {
    return {
        editSupplier: a => dispatch(editSupplier(a)),
        getSupplierData: a => dispatch(getSupplierData(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditSupplier);