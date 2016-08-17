import React from 'react';
import NumberOfPurchasesByDay from './graphs/numberOfPurchasesByDay';
import NumberOfPurchasesByDayData from './graphs/meta/numberOfPurchasesByDay';
import CustomerEngagementPattern from './graphs/customerEngagementPattern';
import PurchasesByTime from './graphs/purchasesByTime';
import CustomerValuePerCity from './graphs/customerValuePerCity';
import TotalCustomersPerCity from './graphs/totalCustomersPerCity';
import OrderMap from './graphs/orderMap';

const style = {
	width: '50%'
}

const Graphifier = React.createClass({
	render: function() {
		return (			
			<div>
				<div className="row">
					<NumberOfPurchasesByDay/>
				</div>
				<div className="row">
					<CustomerValuePerCity />
				</div>
				<div className="row">
					<PurchasesByTime />
				</div>
					<CustomerEngagementPattern />

					<TotalCustomersPerCity />

					<OrderMap />
		    </div>
		)
	}
});

export default Graphifier;