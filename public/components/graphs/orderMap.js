import React from 'react';
import { Map, MarkerGroup } from 'react-d3-map';
import { ZoomControl } from 'react-d3-map-core';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

// var data = [{
//     "type": "Feature",
//     "properties": {
//       "text": "this is a Point!!!"
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [122, 23.5]
//     }
// },
// {
//     "type": "Feature",
//     "properties": {
//       "text": "this is a Point!!!"
//     },
//     "geometry": {
//         "type": "Point",
//         "coordinates": [152, 23.5]
//     }
// }];

var data = {geometry: {coordinates: [[[-74.0479, 40.8820], [-73.9067, 40.8820], [-73.9067, 40.6829], [-74.0479, 40.6829], [-74.0479, 40.8820]]], type: "Polygon"}, id: 999999, properties:{"text": "hi, this is a polygon!"}, type: "Feature"};
var popupContent = function(d) { return d.properties.text; };

var width = 1000;
var height = 800;
var scale = (1 << 18);
var center = [-73.95, 40.7];
// min and max of your zoom scale
var scaleExtent = [1 << 12, 1 << 13];
// set your center point
	
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
			<div style={styleContainer}>
				<Card>
					<Map
					    width= {width}
					    height= {height}
					    scale= {scale}
					    center= {center}
					  >
					    <MarkerGroup
					      key= {"polygon-test"}
					      data= {data}
					      popupContent= {popupContent}
					      markerClass= {"your-marker-css-class"}
					    />
					</Map>
					<ZoomControl
			            zoomInClick={zoomIn}
			            zoomOutClick={zoomOut}
			        />
			    </Card>
		    </div>
		)
	}
});

export default orderMap;