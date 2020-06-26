import React, { Component } from 'react'
import { getMonthlySales } from '../../Redux/Actions';
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

class MonthlySales extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            month_selected: '',
            month_name: '',
            year_selected: '',
            useCanvas: false,
            user_id: ''
        };
    }

    componentDidMount = ()=>{
        this.setState({
            user_id: this.props.id
        })
    }

    render() {
        const { getMonthlySales, monthlySales } = this.props
        const { useCanvas } = this.state
        var tempDate = new Date();
        var currentyear = tempDate.getFullYear()
        var year = []

        for (let i = Number(currentyear); i >= (Number(currentyear) - 25); i--) {
            year.push(i)
        }
        const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        let sales, expense
        monthlySales.data ? sales = monthlySales.data[0][0] : sales = null
        monthlySales.data ? expense = monthlySales.data[1][0] : expense = null

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
                <div className='row my-2'>
                    <h3 className='my-3'><u><strong>Monthly report (Sales and Expenses)</strong></u></h3>
                    <select
                        className="custom-select my-2"
                        onChange={e =>
                            this.setState({
                                year_selected: e.target.value,
                            })
                        }
                    >
                        <option defaultValue>Select Year</option>
                        {
                            year && year.map((y) => (<option key={y} value={y}>{y}</option>))
                        }
                    </select>
                    <select
                        className="custom-select my-2"
                        onChange={e =>
                            this.setState({
                                month_selected: e.target.value,
                                month_name: month[e.target.value - 1]
                            })
                        }
                    >
                        <option defaultValue>Select Month</option>
                        {
                            month && month.map((mon, index) => (<option key={index + 1} value={index + 1}>{mon}</option>))
                        }
                    </select>
                    <button
                        onClick={() => getMonthlySales(this.state)}
                        className='btn btn-primary my-2'
                    >SUBMIT</button>
                </div>
                <div>
                    <div>
                        {
                            monthlySales.data ? <h4>Sale and Expenses for {this.state.month_name} {this.state.year_selected} <br /><span className='h6'>SALES : {monthlySales.data[0][0]}</span><br /><span className='h6'>EXPENSES : {monthlySales.data[1][0]}</span></h4> : <></>
                        }
                    </div>
                    <div>{monthlySales.data && (sales > 1000 || expense > 1000) ? <h5 className='my-3'>X-axis : Sales,Expenses <br />Y-axis : 1 unit = 1000 Rs</h5> : <h5 className='my-3'>X-axis : Sales,Expenses <br />Y-axis : unit = Rupees </h5>}</div>
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
        );
    }
}

const mapStateToProps = state => {
    return {
        monthlySales: state.monthlySales,
        id: state.loginData.data.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMonthlySales: a => dispatch(getMonthlySales(a))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MonthlySales);