import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faExclamationCircle from '@fortawesome/fontawesome-free-solid/faExclamationCircle';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class PageNotFound extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.history.push('/')
        }, 3000)
    }
    render() {
        return (
            <div className="container" >
                <div className="not_found_container">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <div>
                        Oops !! page not found
                </div>
                </div>
                <Dialog open={true}>
                    <div className="dialog_alert">
                        <div>Page not found</div>
                        <div>
                            You will be redirected to Home page in a few seconds...
		            </div>
                    </div>
                </Dialog>

            </div>
        )
    }
}

export default connect()(withRouter(PageNotFound))