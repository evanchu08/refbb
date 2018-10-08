import React, { Component } from 'react';
import MyButton from './button';
import imageNotAvailble from '../../images/image_not_availble.png';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addToCart } from '../../actions/user_actions';
import { Link } from 'react-router-dom'

class Card extends Component {
    renderCardImage(images) {
        if (images.length > 0) {
            return images[0].url
        } else {
            return imageNotAvailble;
        }
    }

    render() {
        const props = this.props;
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div
                    className="image"
                    style={{
                        background: `url(${this.renderCardImage(props.images)}) no-repeat`
                    }}
                    onClick={() => <Link to={`/product_detail/${props._id}`} />}
                >  </div>
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">{props.brand.name}</div>
                        <div className="name">{props.name}</div>
                        <div className="price">$ {props.price}</div>
                    </div>
                    {
                        props.grid
                            ? <div className="description">
                                {props.description}
                            </div> : null
                    }

                    <div className="actions">
                        <div className="button_wrapp">
                            <MyButton
                                type="default"
                                altClass="card_link"
                                title="View product"
                                linkTo={`/product_detail/${props._id}`}
                                addStyles={{
                                    margin: '10px 0 0 0'
                                }}
                            />
                        </div >
                        <div className="button_wrapp">
                            <MyButton
                                type="bag_link"
                                runAction={() => props.user.userData.isAuth ?
                                    this.props.dispatch(addToCart(props._id))
                                    :
                                    this.props.history.push('/register_login')
                                }
                            />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(withRouter(Card));