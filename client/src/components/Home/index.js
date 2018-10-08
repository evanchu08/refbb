import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProductBySold, getProductByArrival } from '../../actions/product_actions';
import CardBlock from '../UI/CardBlock';
import HomeSlider from './HomeSlider';
import HomePromotion from './HomePromotion';

class Home extends Component {
    componentDidMount() {
        this.props.dispatch(getProductBySold());
        this.props.dispatch(getProductByArrival());
    }
    render() {
        return (
            <div>
                <HomeSlider />
                <CardBlock
                    lists={this.props.product.soldData}
                    title="Best Selling guitars"
                />
                <HomePromotion />
                <CardBlock
                    lists={this.props.product.arrivalData}
                    title="New arrivals"
                />
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        product: state.product
    }
}

export default connect(mapStateToProps)(withRouter(Home))