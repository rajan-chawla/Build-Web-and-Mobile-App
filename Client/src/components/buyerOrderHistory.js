import React, { Component } from 'react';
import '../App.css';

export default class buyerOrderHistory extends Component {
    render() {
        let rows = [];
        for (let i = 0; i < 50; i++) {
            rows.push(<div className="card-body " key={i}>

                <div className="row  boxHistory rounded" >
                    <div className="col-12 col-sm-12 col-md-2 text-center">
                        <img className="img-responsive" src="http://placehold.it/120x80" alt="prewiew" width="120" height="80" />
                    </div>
                    <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
                        <h4 className="product-name"><strong>Product Name</strong></h4>
                        <h4>
                            <small>Product description</small>
                        </h4>
                    </div>
                    <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
                        <div className="col-3 col-sm-3 col-md-6 text-md-right ">
                            <h6><strong>25.00 <span className="text-muted">€</span></strong></h6>
                        </div>
                        <div className="col-2 col-sm-12 col-md-6 ">
                            <button type="button" className="btn bg-primary text-white ">Order Again</button>

                        </div>
                    </div>
                </div>
            </div>)
        }


        return (
            <div className="container ">
                <div className="card card-header ">
                <div class="p-3 mb-2 bg-primary text-white text-blod"><h2>Order History</h2></div>
                {rows}
                    </div>
                
            </div>
        )

    }
}
