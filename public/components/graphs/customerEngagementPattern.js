import React from 'react';
import rd3 from 'rd3';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import loadGraph from './meta/customerEngagementPatternMeta';
import CustomerEngagementGrowth from './meta/customerEngagementGrowth';
import 'whatwg-fetch';

const BarChart = rd3.BarChart;

const CustomerEngagement = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            expanded: false
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
                    <CardHeader
                      title=""
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
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
