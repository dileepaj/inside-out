import React from 'react';
import { Map, MarkerGroup } from 'react-d3-map';
import { ZoomControl } from 'react-d3-map-core';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

var data = {geometry: {coordinates: [[[31.2304, 121.4737], [-73.9067, 40.8820], [-73.9067, 40.6829], [-74.0479, 40.6829], [-74.0479, 40.8820]]], type: "Polygon"}, id: 999999, properties:{"text": "hi, this is a polygon!"}, type: "Feature"};
var popupContent = function(d) { return d.properties.text; };

var width = 1000;
var height = 800;
var scale = (1 << 18);
var center = [31.2304, 121.4737];
// min and max of your zoom scale
var scaleExtent = [1 << 12, 1 << 13];
// set your center point
	
const orderMapStyle = {
	marginTop: 100,
}

var popupContent = function(d) { return d.properties.text; };

const orderMap = React.createClass({
	getInitialState: function() {
		return {
			drawer: false,
			data: [],
			scale: scale
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
		    context.setState({
				data: data
			});
		    return data;
		  }).catch(function(ex) {
		    console.log('parsing failed', ex)
		  });
	},

	zoomOut: function() {
      this.setState({
        scale: this.state.scale / 2
      })
    },

    zoomIn: function() {
      this.setState({
        scale: this.state.scale * 2
      })
    },

	render: function() {
        const zoomIn = this.zoomIn;
        const zoomOut = this.zoomOut;

        const styleContainer = {
	        position: 'relative',
	        backgroundColor: '#EEE',
	        width: width
	    }

		return (			
			<div style={orderMapStyle} className="col-md-12 col-lg-12 col-xl-12 col-xl-12 ">
					
					//map should come here
		  </div>
		)
	}
});

export default orderMap;