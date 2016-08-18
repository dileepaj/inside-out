import React from 'react';
import rd3 from 'rd3';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import PurchasesByTimeMeta from './meta/purchasesByTimeMeta';
import Divider from 'material-ui/Divider';
import 'whatwg-fetch';

const BarChart = rd3.BarChart;

const NumberOfPurchasesByDay = React.createClass({
	getInitialState: function() {
		return {
			drawer: false,
			data: [],
			metaData: []
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
		    let metaData = json.highestSales;
		    context.setState({
		    	metaData: metaData
		    });
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
				<Card>
					{ this.state.data ? 
						<div>
							<div className="col-md-9 col-lg-9 col-xl-9">
								<Card>
								<h2> Purchases by time </h2>
								<Divider />
									<BarChart
									  data={this.state.data}
									  width={1000}
									  height={300}
									  title=""
									  xAxisLabel="Time period"
									  yAxisLabel="Purchased amount"
									/>
								</Card>
							</div>
							<div className="col-md-3 col-lg-3 col-xl-3">
								<PurchasesByTimeMeta data={this.state.metaData}/> 
							</div>
						</div> : ''
					}
				</Card>
		    </div>
		)
	}
});

export default NumberOfPurchasesByDay;
