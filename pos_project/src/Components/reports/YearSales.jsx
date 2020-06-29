import React, { Component } from 'react';
import Chart from "react-apexcharts";
import { getYearSales } from '../../Redux/Actions';
import { connect } from "react-redux";

class YearSales extends Component {
    constructor(props) {
        super(props);

        this.state = {
            year_selected: '',
            user_id: ''
        };
    }

    componentDidMount = () => {
        this.setState({
            user_id: this.props.id
        })
    }

    render() {
        const { getYearSales, yearSales, id } = this.props

        var tempDate = new Date();
        var currentyear = tempDate.getFullYear()
        var year = []
        for (let i = Number(currentyear); i >= 2000; i--) {
            year.push(i)
        }

        let [yr,janData,febData,marData,aprData,mayData,junData,julData,augData,sepData,octData,novData,decData] = [null,null,null,null,null,null,null,null,null,null,null,null,null]
        if(yearSales.data){
            yearSales.data.map(month =>{
                yr = month[3]
                if(month[1] == 1){
                    janData = month[0]
                }
                else if(month[1] == 2){
                    febData = month[0]
                }
                else if(month[1] == 3){
                    marData = month[0]
                }
                else if(month[1] == 4){
                    aprData = month[0]
                }
                else if(month[1] == 5){
                    mayData = month[0]
                }
                else if(month[1] == 6){
                    junData = month[0]
                }
                else if(month[1] == 7){
                    julData = month[0]
                }
                else if(month[1] == 8){
                    augData = month[0]
                }
                else if(month[1] == 9){
                    sepData = month[0]
                }
                else if(month[1] == 10){
                    octData = month[0]
                }
                else if(month[1] == 11){
                    novData = month[0]
                }
                else if(month[1] == 12){
                    decData = month[0]
                }
            })
        }

        let options = {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            }
        }
        let series = [
            {
                name: "Sales(Rs)",
                data: [janData,febData,marData,aprData,mayData,junData,julData,augData,sepData,octData,novData,decData]
            }
        ]

        return (
            <div className='p-5'>
                <div>
                    <h3 className='my-3'><u><strong>Yearly report (Sales)</strong></u></h3>
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
                    <button
                        onClick={() => getYearSales(this.state)}
                        className='btn btn-primary my-2'
                    >SUBMIT</button>
                </div>
                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                            <Chart
                                options={options}
                                series={series}
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
    console.log("yearSales :", state.yearSales)
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