import React, { Component } from 'react';
// "react-jsx-highcharts": "^4.1.0",
import Chart from "react-apexcharts";
import { getYearSales } from '../../Redux/Actions';
import { connect } from "react-redux";

class YearSales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        };
    }
    render() {
        const { getYearSales, yearSales, id } = this.props
        return (
            <div>
                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="line"
                                width="1000"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log("yearSales :", state)
    return {
        yearSales: state.yearSales,
        id: state.loginData.data.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getYearSales: a => dispatch(getYearSales(a))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(YearSales);