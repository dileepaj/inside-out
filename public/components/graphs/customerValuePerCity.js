import React from 'react';
import rd3 from 'rd3';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import 'whatwg-fetch';

const PieChart = rd3.PieChart;

const style = {
	width: '50%'
}

const pieChart = {
	marginLeft: '250'
}

const container = {
	marginTop: '25'
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
				{ 
					this.state.data ?
						<div style={container}>
							<div className="col-md-9 col-lg-9 col-xl-9">
								<Card>
									<h2> </h2>
										<CardHeader
                      title="Customer value per city "
                      actAsExpander={false}
                      showExpandableButton={false}
                    />
										<Divider/>
									<CardText>
										<div style={pieChart}>
											<PieChart
										      data={this.state.data}
										      width={450}
										      height={500} 
										      radius={200}
										      innerRadius={75}
										      sectorBorderColor="white"
										      title="" />
									    </div>
								    </CardText>
								</Card>
							</div>
							<div className="col-md-3 col-lg-3 col-xl-3">
								<Card>
								<CardText>
									<h4>Description</h4>
									The Customer Value per city chart is genderated considering various vital factors of the business, 
									which is mainly centered around the customers engagement patterns and potential value the region presents
									as a percentage out of the overrall value.
								</CardText>
								</Card>
								<p></p>
								<Card>
								<CardText>
									<h4>Pain Point Analysis</h4>
									The Customer Value per city chart is genderated considering various vital factors of the business, 
									which is mainly centered around the customers engagement patterns and potential value the region presents
									as a percentage out of the overrall value.
								</CardText>
								</Card>
							</div>
						</div>
					: ''
				}
		    </div>
		)
	}
});

export default NumberOfPurchasesByDay;
