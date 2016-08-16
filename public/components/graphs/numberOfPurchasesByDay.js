import React from 'react';
import rd3 from 'rd3';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
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
		fetch('/api/purchases-by-days')
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		    let data = json.message;
		    let mappedData = [];
		    let xAxis = 1;
		    let values = [];
		    for(var value in data) {
		    	values.push(
		    		{ "x": value, "y": data[value] }
		    	);
		    	xAxis += 1;
		    }
		    mappedData = {
		    	name: "service A",
		    	values: values
		    }
		    let d = [];
		    d.push(mappedData);
		    console.log(d);
		    context.setState({
				data: d 
			});
		    return mappedData;
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
						  width={750}
						  height={300}
						  title="Bar Chart"
						  xAxisLabel="Value"
						  yAxisLabel="Label"
						/>	: ''
					}
				
		    </div>
		)
	}
});

export default NumberOfPurchasesByDay;
