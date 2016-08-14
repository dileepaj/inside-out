import React from 'react';
import rd3 from 'rd3';
import 'whatwg-fetch';

const PieChart = rd3.PieChart;

const NumberOfPurchasesByDay = React.createClass({
	getInitialState: function() {
		return {
			drawer: false,
			data: []
		}
	},

	componentDidMount: function() {
		let context = this;
		fetch('/api/total-customers-per-city')
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		    let data = json.message;
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
					<PieChart
				      data={this.state.data}
				      width={900}
				      height={750} 
				      radius={300}
				      innerRadius={100}
				      sectorBorderColor="white"
				      title="Pie Chart" />	: ''
				}
					
		    </div>
		)
	}
});

export default NumberOfPurchasesByDay;
