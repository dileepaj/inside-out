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
		fetch('/api/customer-value-per-city')
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		    let data = json.message;
		    console.log(data);
		    context.setState({
				data: data
			});
		    // return data;
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
