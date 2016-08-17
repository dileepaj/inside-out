import React from 'react';
import rd3 from 'rd3';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import loadGraph from './meta/customerEngagementPatternMeta';
import 'whatwg-fetch';

const BarChart = rd3.BarChart;

const CustomerEngagement = React.createClass({
    getInitialState: function() {
        return {
            data: []
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

    componentWillUnmount: function() {

    },

    render: function() {
        return (            
            <div id="container-cus-pattern">
                   
            </div>
        )
    }
});

export default CustomerEngagement;
