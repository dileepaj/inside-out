import React from 'react';
import rd3 from 'rd3';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import loadGraph from './meta/customerEngagementPatternMeta';
import CustomerEngagementGrowth from './meta/customerEngagementGrowth';
import Divider from 'material-ui/Divider';
import 'whatwg-fetch';

const BarChart = rd3.BarChart;

const spanStyle = {
    fontSize: 18
}

const retentionRate = {
    color: 'black'
}

const CustomerEngagement = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            expanded: false,
            retention: 0
        }
    },

    componentDidMount: function() {
        let context = this;
        let mappedData = [];
        fetch('/api/customer-engagement-pattern')
          .then(function(response) {
            return response.json()
          }).then(function(json) {
            let data = json.message;
            let retention = 100 - json.retention + '%';
            context.setState({
                retention: retention
            });
            for(var value in data) {
                let totalAmount = data[value]['totalAmount'];
                let averageGap = data[value]['averageGap'];
                let consistency = data[value]['consistency'];
                let arr = [totalAmount, averageGap, consistency];
                mappedData.push(arr);
            }
            loadGraph(mappedData);
          }).catch(function(ex) {
            console.log('parsing failed', ex)
          });
    },

    handleExpandChange: function() {
        this.setState({
            expanded: expanded
        });
    },

    componentWillUnmount: function() {

    },

    render: function() {
        return (   
            <div>
                <Card onExpandChange={this.handleExpandChange}>
                    <h2> Customer engagement pattern </h2>
                    <Divider />
                    <CardHeader
                      title=""
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <span style={spanStyle}> Customer retention rate <span style={retentionRate}>{ this.state.retention }</span> </span>
                    <CardText expandable={true}>
                      <CustomerEngagementGrowth />
                    </CardText>
                    <div id="container-cus-pattern">
                               
                    </div>
                </Card>
            </div>
        )
    }
});

export default CustomerEngagement;
