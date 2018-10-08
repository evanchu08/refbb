import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../../actions/user_actions';
import UserLayout from '../../../hoc/UserLayout';
import UserProductBlock from './product_block';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import Paypal from '../../UI/paypal';

class UserCart extends Component {
    state = {
        loading: true,
        total: 0,
        showTotal: false,
        showSuccess: false
    }
    componentDidMount() {
        const userData = this.props.user.userData;
        let cartItems = [];
        if (userData.cart.length > 0) {
            userData.cart.forEach(item => {
                cartItems.push(item.id);
            })
            this.props.dispatch(getCartItems(cartItems, userData.cart))
                .then(() => {
                    if (this.props.user.cartDetail.length > 0) {
                        this.calculateTotal(this.props.user.cartDetail)
                    }
                })
        }
    }
    calculateTotal = (cartDetail) => {
        let total = 0;
        cartDetail.forEach(item => (
            total += item.quantity * parseInt(item.price, 10)
        ))
        this.setState({
            total,
            showTotal: true
        })
    }
    removeCartHandler = (id) => {
        this.props.dispatch(removeCartItem(id))
            .then(() => {
                if (this.props.user.cartDetail.length <= 0) {
                    this.setState({ showTotal: false })
                } else {
                    this.calculateTotal(this.props.user.cartDetail)
                }
            })
    }
    renderSuccess = () => (
        <div className="cart_success">
            <FontAwesomeIcon icon={faSmile} />
            <div>Your order is completed</div>
            <div>Thank you</div>
        </div>
    )
    EmptyCartItems = () => (
        <div className="cart_no_items">
            <FontAwesomeIcon icon={faFrown} />
            <div>You have no items</div>
        </div>
    )
    transSuccess = (data) => {
        this.props.dispatch(onSuccessBuy({
            cartDetail: this.props.user.cartDetail,
            paymentData: data
        })).then(() => {
            if (this.props.user.successBuy) {
                this.setState({
                    showTotal: false,
                    showSuccess: true
                })
            }
        })
    }
    transError = (data) => {
        console.log('paypal error')
    }
    transCancel = (data) => {
        console.log('paypal cancel')
    }
    render() {
        console.log(this.props.product)
        const user = this.props.user;
        console.log(this.props.user)
        return (
            <UserLayout>
                <div>
                    <UserProductBlock
                        products={user}
                        type="cart"
                        removeCart={(id) => this.removeCartHandler(id)}
                    />
                    {
                        this.state.showTotal ?
                            <div>
                                <div className="user_cart_sum">
                                    <div>
                                        Total amount: $ {this.state.total}
                                    </div>
                                </div>
                            </div>
                            :
                            this.state.showSuccess ?
                                this.renderSuccess()
                                : this.EmptyCartItems()
                    }
                    {
                        this.state.showTotal ?
                            <div className="paypal_button_container">
                                <Paypal
                                    toPay={this.state.total}
                                    onSuccess={(data) => this.transSuccess(data)}
                                    onError={(data) => this.transError(data)}
                                    onCancel={(data) => this.transCancel(data)}
                                />
                            </div>
                            : null
                    }
                </div>
            </UserLayout>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        product: state.product
    }
}

export default connect(mapStateToProps)(withRouter(UserCart));


