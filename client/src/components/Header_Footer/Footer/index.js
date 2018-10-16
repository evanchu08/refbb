import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';
import { Link } from 'react-router-dom';

class Footer extends Component {

    render() {
        const siteData = this.props.site.siteData;
        return (
            siteData ?
                < footer className="bck_b_dark" >
                    <div className="container">
                        <div className="logo">
                            <Link to="/">Refbb</Link>
                        </div>
                        <div className="wrapper">
                            <div className="left">
                                <h2>Contact information</h2>
                                <div className="business_nfo">
                                    <div className="tag">
                                        <FontAwesomeIcon
                                            icon={faCompass}
                                            className="icon"
                                        />
                                        <div className="nfo">
                                            <div>Address</div>
                                            <div>{siteData[0].address}</div>
                                        </div>
                                    </div>
                                    <div className="tag">
                                        <FontAwesomeIcon
                                            icon={faPhone}
                                            className="icon"
                                        />
                                        <div className="nfo">
                                            <div>Phone</div>
                                            <div>{siteData[0].phone}</div>
                                        </div>
                                    </div>
                                    <div className="tag">
                                        <FontAwesomeIcon
                                            icon={faClock}
                                            className="icon"
                                        />
                                        <div className="nfo">
                                            <div>Working hours</div>
                                            <div>{siteData[0].hours}</div>
                                        </div>
                                    </div>
                                    <div className="tag">
                                        <FontAwesomeIcon
                                            icon={faEnvelope}
                                            className="icon"
                                        />
                                        <div className="nfo">
                                            <div>Email</div>
                                            <div>{siteData[0].email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer >
                : null
        )
    }
}

export default Footer