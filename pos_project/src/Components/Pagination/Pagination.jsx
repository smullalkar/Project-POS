import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCustomerData } from '../../Redux/Actions'
import { v4 as uuidv4 } from 'uuid'

class Pagination extends Component {
    constructor(props) {
        super(props)

        this.state = {
            curr_page: 1,
            per_page: 10,
            user_id: ''
        }
    }

    componentDidMount = () => {
        const { getCustomerData, id } = this.props
        this.setState({
            user_id: id
        })
        getCustomerData({user_id:id,curr_page:1,per_page:10})
    }

    handlePagination = (p) => {
        const { getCustomerData, id, total_pages } = this.props
        p = Number(p)

        if (p <= total_pages && p > 0)
            getCustomerData({user_id:id,curr_page:p,per_page:10})

        this.setState({
            curr_page: p
        })
    }

    render() {
        const { getCustomerData, total_pages } = this.props
        let { curr_page } = this.state
        let arr = []

        for (let i = 1; i <= total_pages; i++)
            arr.push(i)

        return (
            <>
                <nav className="d-flex justify-content-center mt-5">
                    <ul className="pagination">
                        <li className="page-item">
                            <button className="page-link" onClick={() => this.handlePagination(curr_page > 1 ? curr_page - 1 : 1)}>
                                Prev
                            </button>
                        </li>
                        {
                            arr.map(item =>
                                <li key={uuidv4()} className="page-item">
                                    <button className="page-link" onClick={() => this.handlePagination(item)}>
                                        {item}
                                    </button>
                                </li>)
                        }
                        <li className="page-item">
                            <button className="page-link" onClick={() => this.handlePagination(curr_page < total_pages ? curr_page + 1 : arr[arr.length - 1])}>
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </>
        )
    }
}
const mapStateToProps = state => ({
    total_pages: state.total_pages,
    page: state.page,
    id: state.loginData.data.id
});
const mapDispatchToProps = dispatch => ({
    getCustomerData: (payload) => dispatch(getCustomerData(payload))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination);