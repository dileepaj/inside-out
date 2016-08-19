import React from 'react';
import NumberOfPurchasesByDay from './graphs/numberOfPurchasesByDay';
import CustomerEngagementPattern from './graphs/customerEngagementPattern';
import PurchasesByTime from './graphs/purchasesByTime';
import CustomerValuePerCity from './graphs/customerValuePerCity';
import PaintPointReview from './graphs/paintPointReview';
import TotalCustomersPerCity from './graphs/totalCustomersPerCity';
import OrderMap from './graphs/orderMap';

const style = {
	marginTop: '80',
	marginLeft: '20'
}

const Graphifier = React.createClass({
	
	render: function() {
		return (			
			<div style={style}>
				<div className="row">
					<NumberOfPurchasesByDay/>
				</div>
				<div className="row">
					<CustomerValuePerCity />
				</div>
				<div className="row">
					<PaintPointReview />
				</div>
				<div className="row">
					<PurchasesByTime />
				</div>
				<div className="row">
					<TotalCustomersPerCity />
				</div>
				<div className="row">
					<CustomerEngagementPattern />
				</div>
				<div className="row">
					<OrderMap />
				</div>
		    </div>
		)
	}
});

export default Graphifier;