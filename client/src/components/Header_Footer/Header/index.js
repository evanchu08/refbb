import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logoutUser } from '../../../actions/user_actions';

class Header extends Component {
    state = {
        page: [
            {
                name: 'Home',
                linkTo: '/',
                public: true
            },
            {
                name: 'Guitars',
                linkTo: '/shop',
                public: true
            }
        ],
        user: [
            {
                name: 'My Cart',
                linkTo: '/user/cart',
                public: false
            },
            {
                name: 'My Account',
                linkTo: '/user/dashboard',
                public: false
            },
            {
                name: 'Log in',
                linkTo: '/register_login',
                public: true
            },
            {
                name: 'Log out',
                linkTo: '/user/logout',
                public: false
            }
        ]
    }
    handleLogOut = () => (
        this.props.dispatch(logoutUser())
            .then(response => {
                if (response.payload.success) {
                    this.props.history.push('/');
                }
            })
    )
    defaultLink = (list, i) => (
        list.name === 'Log out' ?
            <div className="log_out_link"
                key={i}
                onClick={() => this.handleLogOut()}
            >{list.name}</div>
            :
            <Link to={list.linkTo} key={i}>
                {list.name}
            </Link>
    )


    cartLink = (list, i) => {
        const user = this.props.user.userData;
        return (
            <div className="cart_link" key={i}>
                <span>{user.cart ? user.cart.length : 0}  </span>
                < Link to={list.linkTo} key={i} >
                    {list.name}
                </Link >
            </div>
        )
    }

    showLinks = (items) => {
        let lists = [];
        if (this.props.user.userData) {
            items.forEach(item => {
                if (!this.props.user.userData.isAuth) {
                    if (item.public === true) {
                        lists.push(item);
                    }
                } else {
                    if (item.name !== 'Log in') {
                        lists.push(item);
                    }
                }
            })
        }
        return lists.map((list, i) => {
            if (list.name !== 'My Cart') {
                return this.defaultLink(list, i);
            } else {
                return this.cartLink(list, i);
            }
        })
    }

    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            Refbb
			            </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            {this.showLinks(this.state.user)}
                        </div>
                        <div className="bottom">
                            {this.showLinks(this.state.page)}
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header))