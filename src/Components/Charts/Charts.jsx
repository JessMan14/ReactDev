import React, { Component } from 'react'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";

import BadgeMaterialUi from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import CircleExclamationOff from "../../Icons/CircleExclamationOff"
import Me from "../../Icons/Me.PNG";

export default class Charts extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            startDate: new Date(),
            count: 0
        }
    }

    componentDidMount() {

        am4core.useTheme(am4themes_animated);

        let chart = am4core.create("LinesChart", am4charts.XYChart);

        this.debugTest();

        chart.fontSize = 14;

        // Add data
        chart.data = [{
            "date": new Date(2018, 8, 1),
            "value": 450,
            "value2": 362,
            "value3": 699
        }, {
            "date": new Date(2018, 9, 2),
            "value": 269,
            "value2": 450,
            "value3": 841
        }, {
            "date": new Date(2018, 10, 3),
            "value": 700,
            "value2": 358,
            "value3": 699
        }, {
            "date": new Date(2018, 11, 4),
            "value": 490,
            "value2": 367,
            "value3": 500
        }, {
            "date": new Date(2018, 12, 5),
            "value": 500,
            "value2": 485,
            "value3": 369
        }, {
            "date": new Date(2019, 1, 6),
            "value": 550,
            "value2": 354,
            "value3": 250
        }, {
            "date": new Date(2019, 2, 7),
            "value": 420,
            "value2": 350,
            "value3": 600
        }];

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 30;
        dateAxis.dateFormats.setKey("day", "MMMM d, yyyy");

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        // changes the distance of the interval of the y-axis
        valueAxis.renderer.minGridDistance = 50;

        
        this.createSeries("value", "Series #1", chart);
        this.createSeries("value2", "Series #2", chart);
        this.createSeries("value3", "Series #3", chart);
        
        chart.legend = new am4charts.Legend();
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.maxTooltipDistance = 0;

        this.chart = chart;
    }

    inc1 = () => {
        this.inc(1);
    }
    dec1 = () => {
        this.inc(-1);
    }
    inc = (n) => {
        let count = this.state.count + n;
        if (count < 0) count = 0;
        this.setState({
          count: count
        });
    }
    
    debugTest = () => {

        let response = [
            {
                "segment": "parks",
                "typesList" : {
                    "lighting" : 1000
                }
            },
            {
                "segment": "recreation",
                "typesList" : {
                    "lighting" : 1000,
                    "other" : 2000
                }
            }
        ];


        let part1 = response[0].typesList;
        let part2 = response[1].typesList;

        let keys1 = Object.keys(part1);
        let values1 = Object.values(part1);

        let keys2 = Object.keys(part2);
        let values2 = Object.values(part2);

        let data = [];
        var obj = {};
        obj["segment"] = "Willdan";

        for(var i=0;i< keys2.length;i++){
            obj[keys2[i]] = values2[i];
        }

        data.push(obj);
   
        console.log("data = " + JSON.stringify(data));        
    }

    createSeries = (field, name, chart) => {
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = "[font-size: 30px]" + name + "[/]";

        series.tooltipText = "{dateX}: [b]{valueY}[/]";
        series.strokeWidth = 2;
        
        // Set up tooltip
        series.adapter.add("tooltipText", function(ev) {
          var text = "[bold]{dateX}[/]\n"
          chart.series.each(function(item) {
            text += "[" + item.stroke.hex + "]●[/] " + item.name + ": {" + item.dataFields.valueY + "}\n";
          });
          return text;
        });
        
        // series.tooltip.getFillFromObject = false;
        // series.tooltip.background.fill = am4core.color("#fff");
        // series.tooltip.label.fill = am4core.color("#00");
        
        // var bullet = series.bullets.push(new am4charts.CircleBullet());
        // bullet.circle.stroke = am4core.color("#fff");
        // bullet.circle.strokeWidth = 2;
        
        return series;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    handleChange = date => {
        this.setState({
          startDate: date
        })
      }


    render() {


        return (
            <div>
                {/* <div id="SalesChart" style={{ width: "100%", height: "500px" }}></div> */}
                <div>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                    />                    
                </div>
                <div id="LinesChart" style={{ width: "100%", height: "400px" }}></div>
                <div>
                    <table>
                    <tbody>
                        <tr>                        
                        <td>
                            <div>
                                <BadgeMaterialUi color="primary" overlap="circle" badgeContent={this.state.count}>
                                    <CircleExclamationOff width="30px" height="30px"/>
                                </BadgeMaterialUi>                                                                                                      
                            </div>
                        </td>
                        <td>
                            <div>
                                <BadgeMaterialUi color="primary" overlap="circle" badgeContent={this.state.count}>
                                    <Avatar alt="jessie" src={Me} />
                                </BadgeMaterialUi>                                                                                                      
                            </div>
                        </td>
                        <td>
                        <div>
                            {this.state.count == 0 ?
                                <BadgeMaterialUi color="primary" overlap="circle" 
                                        anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} color="default"
                                        variant="dot">
                                    <Avatar alt="jessie" src={Me} />
                                </BadgeMaterialUi>  
                            :
                                <BadgeMaterialUi color="primary" overlap="circle" 
                                            anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} color="error"
                                            variant="dot">
                                        <Avatar alt="jessie" src={Me} />
                            </BadgeMaterialUi>
                            }                                                                                                          
                        </div> 
                        </td>
                        <td>
                            <div>
                                <button onClick={this.inc1.bind(this)}>+1</button>
                                <button onClick={this.dec1.bind(this)}>-1</button>
                            </div>
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
