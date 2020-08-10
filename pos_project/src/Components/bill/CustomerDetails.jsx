import React, { Component } from 'react';
import { addCustomer } from '../../Redux/Actions';
import { connect } from "react-redux";

class CustomerDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customer_name: '',
            contact: '',
            email: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        const { addCustomer } = this.props
        return (
            <div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        addCustomer(this.state)
                        this.setState({
                            customer_name: '',
                            contact: '',
                            email: ''
                        })
                    }}
                >
                    <div className="row">
                        {/* <label>Customer name</label> */}
                        <div className='mt-3 col-12 col-sm-12 col-md-4 col-lg-3'>
                            <input
                                name='customer_name'
                                value={this.state.customer_name}
                                onChange={this.handleChange}
                                type="text"
                                className="form-control"
                                placeholder='Customer Name'
                            />
                        </div>
                        <div className='mt-3 col-12 col-sm-12 col-md-4 col-lg-3'>
                            <input
                                name='contact'
                                value={this.state.contact}
                                onChange={this.handleChange}
                                type="text"
                                className="form-control"
                                placeholder='Contact Number'
                            />
                        </div>
                        <div className='mt-3 col-12 col-sm-12 col-md-4 col-lg-3'>
                            <input
                                name='email'
                                value={this.state.email}
                                onChange={this.handleChange}
                                type="text"
                                className="form-control"
                                placeholder='E-mail'
                            />
                        </div>
                        <div className='mt-3 col-12 col-sm-12 col-md-4 col-lg-3'>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >ADD CUSTOMER</button>
                        </div>
                    </div>
                </form>
                <hr/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('billing customer :', state.billing_customer)
    return {
        billing_customer: state.billing_customer
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addCustomer: a => dispatch(addCustomer(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CustomerDetails);