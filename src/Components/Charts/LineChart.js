import CanvasJSReact from "../../CanvasJS/canvasjs.react";
import React, {Component} from "react";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class LineChart extends Component {
	render() {
		console.log("LINECHART", this.props.dataObjArray);
		const data = this.props.dataObjArray;
		const options = {
			animationEnabled: true,
			animationDuration: 2000,
			title:{
				text: this.props.yLabel+" trends for the last 7 days"
			},
			axisX: {
				valueFormatString: "DD-MMM-YY",
				tickLength: 0.5
			},
			axisY: {
				title: this.props.yLabel,
				prefix: "",
				includeZero: false
			},
			data: [{
				yValueFormatString: "#,###",
				xValueFormatString: "DD-MMM-YYYY",
				type: "spline",
				dataPoints: data
			}]
		}
		return (
		<div>
			{console.log("DATAPOINTS", this.props.dataObjArray)}
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}
export default LineChart;      