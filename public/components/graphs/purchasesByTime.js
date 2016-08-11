import React from 'react';
import rd3 from 'rd3';
import 'whatwg-fetch';

const BarChart = rd3.BarChart;

const NumberOfPurchasesByDay = React.createClass({
	getInitialState: function() {
		return {
			drawer: false,
			data: []
		}
	},

	componentDidMount: function() {
		let context = this;
		fetch('/api/purchases-by-time')
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		    console.log('parsed json', json);
		    let data = json.message;
		 //    let mappedData = [];
		 //    let xAxis = 1;
		 //    let values = [];
			
			// let valuePerTimePeriod = [];
			// let weeklyData = null;
			// let dayNumber = 0;
			// let dataNumber = 0;
			// let dataLength = data.length;
			// let totalAmount = null;
			// let currentName = null;
			// let layerObj = null;
			// let layerArr = [];
			// for(var val in data) {
			// 	if(dataNumber !== dataLength) {
			// 		currentName = data[val].name;
			// 		//console.log(currentName);
			// 		for(var innerVal in data) {
			// 			currentName = data[innerVal].name
			// 			weeklyData = data[innerVal].values;
			// 			weeklyData.map(function(day) {
			// 				if(day.day == dayNumber) {
			// 					totalAmount = day.totalAmount;
			// 					//console.log(totalAmount);
			// 					layerObj = {
			// 						"x": currentName, "y": totalAmount
			// 					}
			// 					layerArr.push(layerObj);
			// 				}
			// 			});
			// 		}
			// 		dayNumber++;
			// 	}
			// 	dataNumber++;
			// }
			// console.log(layerArr);
			// console.log('mapped data');
			//console.log(mappedData);


		 //    console.log('processing');
		 //    for(var value in data) {
		 //    	values.push(
		 //    		{ "x": value, "y": data[value] }
		 //    	);
		 //    	xAxis += 1;
		 //    }
		 //    console.log(values);
		 //    mappedData = {
		 //    	name: "service A",
		 //    	values: values
		 //    }
		 //    let d = [];
		 //    d.push(mappedData);
		 //    console.log(d);
		    context.setState({
				data: data
			});
		    return data;
		  }).catch(function(ex) {
		    console.log('parsing failed', ex)
		  });
	},

	render: function() {
		return (			
			<div>
				{ this.state.data ? 
					<BarChart
					  data={this.state.data}
					  width={1400}
					  height={300}
					  title="Bar Chart"
					  xAxisLabel="Time period"
					  yAxisLabel="Purchased amount"
					/>	: ''
				}
					
		    </div>
		)
	}
});

export default NumberOfPurchasesByDay;
