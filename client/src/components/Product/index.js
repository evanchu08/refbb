import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProductDetail, clearProductDetail } from '../../actions/product_actions';
import PageTop from '../UI/PageTop';
import ProdNfo from './ProdNfo';
import ProdImg from './ProdImg';
import CircularProgress from '@material-ui/core/CircularProgress';
import { addToCart } from '../../actions/user_actions';

class ProductPage extends Component {
    componentDidMount() {
        const id = this.props.match.params.id
        this.props.dispatch(getProductDetail(id)).then(response => {
            if (!this.props.product.productDetail) {
                this.props.history.push('/')
            }
        })
    }
    componentWillMount() {
        this.props.dispatch(clearProductDetail());
    }
    addToCartHandler = (id) => {
        this.props.dispatch(addToCart(id))
    }
    render() {
        return (
            <div>
                <PageTop
                    title="Product detail"
                />
                <div className="container">
                    {this.props.product.productDetail ?
                        <div className="product_detail_wrapper">
                            <div className="left">
                                <div style={{ width: '500px' }}>
                                    <ProdImg
                                        detail={this.props.product.productDetail}
                                    />
                                </div>
                            </div>
                            <div className="right">
                                <ProdNfo
                                    detail={this.props.product.productDetail}
                                    addToCart={(id) => this.addToCartHandler(id)}
                                />
                            </div>
                        </div>
                        : <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        product: state.product,
        user: state.user
    }
}
export default connect(mapStateToProps)(withRouter(ProductPage));


