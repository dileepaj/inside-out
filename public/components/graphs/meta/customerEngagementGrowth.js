import React from 'react';
import rd3 from 'rd3';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import 'whatwg-fetch';

const LineChart = rd3.LineChart;

const dataObj = [
  {
	name: 'series2',
	values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
  },
];

const apps =   {
    name: 'series3',
    values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
};

const lineData = [
      { 
        name: 'series1',
        values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
        strokeWidth: 3,
        strokeDashArray: "5,5",
      }
];

const names = ['tom', 'stewy', 'peter', 'brian', 'batman', 'superman', 'flash', 'captain america'];

const CustomerEngagementGrowth = React.createClass({
	getInitialState: function() {
		return {
			drawer: false,
			data: [],
			names: [],
			lineData: []
		}
	},

	componentDidMount: function() {
		this.setState({
			lineData: dataObj
		});
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
				data: purchaseData,
				names: names
			});
		    return mappedData;
		  }).catch(function(ex) {
		    console.log('parsing failed', ex)
		  });
	},

	renderTable: function() {
	    return this.state.names.map(function(data) {
	      return (
	        <TableRow>
	          <TableRowColumn>{ data }</TableRowColumn>
	        </TableRow>
	      );
	    });
	},

	_changeGraph: function() {
		this.setState({
			lineData: lineData
		});
		this.forceUpdate();
	},

	shouldComponentUpdate: function() {
		return true;
	},

	render: function() {
		return (			
			<div>
				{ 
					this.state.data ?
						<div>
							<div className="col-md-9 col-lg-9 col-xl-9">
								<Card>
									<LineChart
								        legend={true}
								        data={this.state.lineData}
								        width='100%'
								        height={400}
								        viewBoxObject={{
								          x: 0,
								          y: 0,
								          width: 500,
								          height: 400
								        }}
								        title=""
								        yAxisLabel="Growth"
								        xAxisLabel="Month"
								        domain={{x: [,6], y: [-10,]}}
								        gridHorizontal={true}
								    />
								</Card>
							</div>
							<div className="col-md-3 col-lg-3 col-xl-3">
							  <Table selectable={true} onRowSelection={this._changeGraph}>
							    <TableHeader displaySelectAll={false}>
							      <TableRow>
							        <TableHeaderColumn>Customer</TableHeaderColumn>
							      </TableRow>
							    </TableHeader>
							    <TableBody displayRowCheckbox={false}>
							    	{ this.state.names ? this.renderTable() : '' }
							    </TableBody>
							  </Table>
							</div>
						</div>
					: <CircularProgress size={2} />
				}
		    </div>
		)
	}
});

export default CustomerEngagementGrowth;
