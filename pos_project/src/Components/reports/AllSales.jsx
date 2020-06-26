import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllSales } from '../../Redux/Actions';
import { connect } from "react-redux";
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    LabelSeries
} from 'react-vis';


class AllSales extends Component {
    state = {
        startDate: new Date(),
        sendDate: '',
        useCanvas: false,
    };

    handleChange = date => {
        this.setState({
            startDate: date,
            sendDate: date.toISOString()
        });
    };

    render() {
        const { getAllSales, allSales } = this.props
        const { useCanvas } = this.state
        const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

        let sales, expense
        allSales.data ? sales = allSales.data[0][0] : sales = null
        allSales.data ? expense = allSales.data[1][0] : expense = null

        var greenData, blueData, labelData
        if (sales < 1000 || expense < 1000) {
            greenData = [{ x: 'Sales', y: sales }];

            blueData = [{ x: 'Expenses', y: expense }];

            labelData = greenData.map((d, idx) => ({
                x: d.x,
                y: Math.max(greenData[idx].y, blueData[idx].y)
            }));
        }
        else {
            greenData = [{ x: 'Sales', y: (sales / 1000) }];

            blueData = [{ x: 'Expenses', y: (expense / 1000) }];

            labelData = greenData.map((d, idx) => ({
                x: d.x,
                y: Math.max(greenData[idx].y, blueData[idx].y)
            }));
        }

        return (
            <div className='p-5'>
                <h3 className='my-3'><u><strong>Any Day report (Sales and Expenses)</strong></u></h3>
                <div className='row my-3'>
                    <DatePicker
                        className='ml-3'
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                    />
                    <button
                        className='mx-3 btn btn-primary'
                        onClick={() => getAllSales(this.state.sendDate)}
                    >
                        SUBMIT
                    </button>
                </div>
                <div>
                    <div>
                        {
                            allSales.data ? <h4>Sale and Expenses for {(this.state.startDate).toString()}<br /><span className='h6'>SALES : {allSales.data[0][0]}</span><br /><span className='h6'>EXPENSES : {allSales.data[1][0]}</span></h4> : <></>
                        }
                    </div>
                    <div>{ allSales.data && (sales > 1000 || expense > 1000) ? <h5 className='my-3'>X-axis : Sales,Expenses <br />Y-axis : 1 unit = 1000 Rs</h5> : <h5 className='my-3'>X-axis : Sales,Expenses <br />Y-axis : unit = Rupees </h5>}</div>
                    <XYPlot xType="ordinal" width={350} height={350} xDist35ce={100}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <BarSeries className="vertical-bar-series-example" data={greenData} />
                        <BarSeries data={blueData} />
                        <LabelSeries data={labelData} getLabel={d => d.x} />
                    </XYPlot>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log("state :", state)
    return {
        allSales: state.allSales
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllSales: a => dispatch(getAllSales(a))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllSales);
