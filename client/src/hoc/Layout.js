import React, { Component } from 'react';
import Header from '../components/Header_Footer/Header';
import Footer from '../components/Header_Footer/Footer';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSiteInfo } from '../actions/site_actions';
class Layout extends Component {
    componentDidMount() {
        if (Object.keys(this.props.site).length === 0) {
            this.props.dispatch(getSiteInfo());
        }
    }
    render() {
        return (
            <div>
                <Header />
                <div className="page_container">
                    {this.props.children}
                </div>
                <Footer
                    site={this.props.site} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        site: state.site
    }
}
export default connect(mapStateToProps)(withRouter(Layout))