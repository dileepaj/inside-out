import React from 'react';
import rd3 from 'rd3';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import 'whatwg-fetch';

const LineChart = rd3.LineChart;

const dataObj1 = [
  {
	name: '',
	values : [ { x: 0, y: 0.3 }, { x: 1, y: 0.5 }, { x: 2, y: 0.1 }, { x: 3, y: 0.7 }, { x: 4, y: 0.9 }, { x: 5, y: 0.6 }, { x: 6, y: 0.2 } ],
	strokeWidth: 3,
	strokeDashArray: "5,5",
  },
];

const dataObj2 = [
  {
	name: '',
	values : [ { x: 0, y: 0.8 }, { x: 1, y: 0.5 }, { x: 2, y: 0.3 }, { x: 3, y: 0.6 }, { x: 4, y: 0.4 }, { x: 5, y: 0.2 }, { x: 6, y: 0.9 } ],
	strokeWidth: 3,
	strokeDashArray: "5,5",
  },
];

const dataObj3 = [
  {
	name: '',
	values : [ { x: 0, y: 0.8 }, { x: 1, y: 0.5 }, { x: 2, y: 0.4 }, { x: 3, y: 0.7 }, { x: 4, y: 0.4 }, { x: 5, y: 0.6 }, { x: 6, y: 0.2 } ],
	strokeWidth: 3,
	strokeDashArray: "5,5",
  },
];

const dataObj4 = [
  { 
	name: '',
	values: [ { x: 0, y: 0.3 }, { x: 1, y: 0.5 }, { x: 2, y: 0.2 }, { x: 3, y: 0.9 }, { x: 4, y: 1 }, { x: 5, y: 0.8 }, { x: 6, y: 0.8 } ],
	strokeWidth: 3,
	strokeDashArray: "5,5",
  }
];

// const dataObj6 = [
//   {
// 	name: 'series2',
// 	values : [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
//   },
// ];

const apps =   {
    name: '',
    values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
};

const lineData = [
      { 
        name: '',
        values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
        strokeWidth: 3,
        strokeDashArray: "5,5",
      }
];

const names = ['沈甜', '任瑞凤', '牧先生', '金石', '闫晓薇', '王燕', '嵇永庆', '刘瑾','Matt Hendrick','李鑫'];
const addresses = ['松山湖管委会松山湖工业北三路华为南方公寓南区18A804','汉中路218号B座1503室','广安门外街道广外太平里10号楼四单元604室',
'松山湖管委会松山湖工业北三路华为南方公寓南区18A804','广安门外街道广外太平里10号楼四单元604室','阳明街道金型西路1001号余姚市运政稽查大队',
'五角场街道上海市杨浦区国庠路28号中经堂', '稠城街道义乌市第四中学','阳明街道金型西路1001号余姚市运政稽查大队','天平路街道复兴中路1295弄22号2楼' ];

const rowObjects = [
	{
		name : '沈甜',
		address : '松山湖管委会松山湖工业北三路华为南方公寓南区18A804'
	},
	{
		name : '任瑞凤',
		address : '汉中路218号B座1503室'
	},
		{
		name : '牧先生',
		address : '广安门外街道广外太平里10号楼四单元604室'
	},
		{
		name : 'Matt Hendrick',
		address : '阳明街道金型西路1001号余姚市运政稽查大队'
	},
		{
		name : '金石',
		address : '阳明街道金型西路1001号余姚市运政稽查大队'
	}

]

const CustomerEngagementGrowth = React.createClass({
	getInitialState: function() {
		return {
			drawer: false,
			data: [],
			names: [],
			lineData: dataObj1,
			addresses : []
		}
	},

	componentDidMount: function() {
		
	},

	renderTable: function() {
	    return rowObjects.map(function(data) {
	      return (
	        <TableRow>
	          <TableRowColumn>{ data.name }</TableRowColumn>
						<TableRowColumn>{ data.address }</TableRowColumn>
	        </TableRow>
	      );
	    });
	},

	_changeGraph: function() {
		if(this.state.lineData == dataObj1) {
			this.setState({
				lineData: dataObj2
			});
		} else if(this.state.lineData == dataObj2) {
			this.setState({
				lineData: dataObj3
			});
		} else if(this.state.lineData == dataObj3) {
			this.setState({
				lineData: dataObj4
			});
		}
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
								        domain={{x: [0,6], y: [0,3]}}
								        gridHorizontal={true}
								    />
								</Card>
							</div>
							<div className="col-md-3 col-lg-3 col-xl-3">
							  <Table selectable={true} onRowSelection={this._changeGraph}>
							    <TableHeader displaySelectAll={false}>
							      <TableRow>
							        <TableHeaderColumn>Customer Name</TableHeaderColumn>
									<TableHeaderColumn>Address</TableHeaderColumn>
							      </TableRow>
							    </TableHeader>
							    <TableBody displayRowCheckbox={false}>
							    	{ this.renderTable() }								
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
