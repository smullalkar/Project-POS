import React, { Component } from 'react'
import { deleteStock } from '../../Redux/Actions';
import { connect } from "react-redux";

class DeleteStock extends Component {
    render() {
        const { deleteStock } = this.props
        const match_id = this.props.match.params.id
        return (
            <div className='text-center m-5'>
                <h3>Are you sure you want to delete this stock?</h3>
                <button
                    onClick={() => {
                        deleteStock(match_id)
                        setTimeout(() => {
                            this.props.history.push('/home')
                        }, 500);
                    }
                    }
                    className='btn btn-primary m-3'
                >
                    Confirm
                </button>
                <button
                    className='btn btn-primary m-3'
                    onClick={() => this.props.history.goBack()}
                >
                    Cancel
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log('inventoryData', state.supplierData)
    return {
        id: state.loginData.data.id
    };
};
const mapDispatchToProps = dispatch => {
    return {
        deleteStock: a => dispatch(deleteStock(a))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteStock);