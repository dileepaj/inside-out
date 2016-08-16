import React from 'react';
import NumberOfPurchasesByDay from './graphs/numberOfPurchasesByDay';
import CustomerEngagementPattern from './graphs/customerEngagementPattern';
import PurchasesByTime from './graphs/purchasesByTime';
import CustomerValuePerCity from './graphs/customerValuePerCity';
import TotalCustomersPerCity from './graphs/totalCustomersPerCity';

const style = {
	width: '50%'
}

const Graphifier = React.createClass({
	render: function() {
		return (			
			<div>
				<div className="row">
					<div className="col-xl-6 col-lg-6 col-md-6">
						<NumberOfPurchasesByDay/>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6">
						<CustomerValuePerCity />
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<PurchasesByTime />
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<CustomerEngagementPattern />
					</div>
				</div>		
				<TotalCustomersPerCity />
		    </div>
		)
	}
});

export default Graphifier;