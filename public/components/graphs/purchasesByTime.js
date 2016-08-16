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
		fetch('/api/purchases-by-time')
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		    console.log('parsed json', json);
		    let data = json.message;
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
				<Card >
					<CardHeader
				      title="Purchases By Time"
				    />
						{ this.state.data ? 
							<BarChart
							  data={this.state.data}
							  width={1000}
							  height={300}
							  title="Bar Chart"
							  xAxisLabel="Time period"
							  yAxisLabel="Purchased amount"
							/>	: ''
						}
				</Card>
		    </div>
		)
	}
});

export default NumberOfPurchasesByDay;
