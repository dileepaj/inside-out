import React from 'react';
import rd3 from 'rd3';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import MetaDataTable from './meta/metaDataTable';
import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import 'whatwg-fetch';

const BarChart = rd3.BarChart;

const container = {
	marginTop: '25'
}

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
		fetch('/api/purchases-by-days')
		  .then(function(response) {
		    return response.json()
		  }).then(function(json) {
		    let data = json.message;
		    let mappedData = [];
		    let xAxis = 1;
		    let values = [];
		    let metaValues = [];
		    for(var value in data) {
		    	values.push(
		    		{ "x": value, "y": data[value] }
		    	);
		    	metaValues.push(data[value]);
		    	xAxis += 1;
		    }

		    mappedData = {
		    	name: "service A",
		    	values: values
		    }

		    let purchaseData = [];
		    purchaseData.push(mappedData);

		    context.setState({
		    	metaData: metaValues
		    });

		    context.setState({
				data: purchaseData 
			});
		    return mappedData;
		  }).catch(function(ex) {
		    console.log('parsing failed', ex)
		  });
	},

	render: function() {
		return (			
			<div>
				{ 
					this.state.data ?
						<div style={container}>
							<div className="col-md-9 col-lg-9 col-xl-9">
								<Card>
									<h2> </h2>
										<CardHeader
                      title="Purchase By Day"
                      actAsExpander={false}
                      showExpandableButton={false}
                    />
										<Divider/>
									<CardText>
										<BarChart
										  data={this.state.data}
										  width={750}
										  height={300}
										  title=""
										  xAxisLabel="Days"
										  yAxisLabel="No of purchases"
										/>
									</CardText>
								</Card>
							</div>
							<div className="col-md-3 col-lg-3 col-xl-3">
								<MetaDataTable data={this.state.metaData} />
							</div> 
						</div>
					: <CircularProgress size={2} />
				}
		    </div>
		)
	}
});

export default NumberOfPurchasesByDay;
