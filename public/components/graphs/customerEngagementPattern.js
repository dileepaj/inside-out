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
            // context.setState({
            //     retention: retention
            // });
            for(var value in data) {
                let totalAmount = data[value]['totalAmount'];
                let averageGap = data[value]['averageGap'];
                let consistency = data[value]['consistency'];
                let arr = [totalAmount, averageGap, consistency];
                mappedData.push(arr);
            }
            loadGraph(mappedData,retention);
          }).catch(function(ex) {
            console.log('parsing failed', ex)
          });
    },

    handleExpandChange: function() {
        //document.getElementById('container-cus-pattern').style.display = 'none';
        this.setState({
            expanded: !this.state.expanded
        });
    },

    componentWillUnmount: function() {

    },

    render: function() {
        return (   
            <div className="col-md-12 col-lg-12 col-xl-12">
                <Card onExpandChange={this.handleExpandChange}>
                    <h2>  </h2>
                    <CardHeader
                      title="Consumer Trust Index"
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <Divider />
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
