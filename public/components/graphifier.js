import React from 'react';
import NumberOfPurchasesByDay from './graphs/numberOfPurchasesByDay';
import CustomerEngagementPattern from './graphs/customerEngagementPattern';
import PurchasesByTime from './graphs/purchasesByTime';
import CustomerValuePerCity from './graphs/customerValuePerCity';
import TotalCustomersPerCity from './graphs/totalCustomersPerCity';
import OrderMap from './graphs/orderMap';

const style = {
	marginTop: '50',
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
					<PurchasesByTime />
				</div>
				<div className="row">
					<TotalCustomersPerCity />
				</div>
				<div className="row">
					<h2> Customer engagement pattern </h2>
					<CustomerEngagementPattern />
				</div>
				<div className="row">
					<h2> Orders map </h2>
					<OrderMap />
				</div>
		    </div>
		)
	}
});

export default Graphifier;