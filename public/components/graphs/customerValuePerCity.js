import React from 'react';
import rd3 from 'rd3';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import 'whatwg-fetch';

const PieChart = rd3.PieChart;

const style = {
	width: '50%'
}

const NumberOfPurchasesByDay = React.createClass({
	getInitialState: function() {
		return {
			drawer: false,
			data: []
		}
	},

	componentDidMount: function() {
		let context = this;
		fetch('/api/total-revenue-per-city')
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		    let data = json.message;
		    console.log(data);
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
						<PieChart
					      data={this.state.data}
					      width={450}
					      height={500} 
					      radius={200}
					      innerRadius={75}
					      sectorBorderColor="white"
					      title="Pie Chart" />	: ''
					}
		    </div>
		)
	}
});

export default NumberOfPurchasesByDay;
