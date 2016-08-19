import React from 'react';
import rd3 from 'rd3';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TotalCustomersPerCityMeta from './meta/totalCustomersPerCityMeta';
import Divider from 'material-ui/Divider';
import metaStyle from './meta/style';
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
				{ 
					this.state.data ? 
						<div style={container}>
							<div className="col-md-9 col-lg-9 col-xl-9">
								<Card>
									<h2> </h2>
										<CardHeader
                      title="Highest Valued Cities"
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
							<div style={metaStyle} className="col-md-3 col-lg-3 col-xl-3">
								<Card>
								<CardText>
									<h4>Description</h4>
									The Highest valued cities chart is generated considering overall online purchasing patterns of consumers in those respective 
									Cities.
								</CardText>
								</Card>
								<p></p>
							</div>
							<div className="col-md-3 col-lg-3 col-xl-3">
								<TotalCustomersPerCityMeta data={this.state.data} />
							</div> 
						</div>
					: '' 
				}
		    </div>
		)
	}
});

export default NumberOfPurchasesByDay;
