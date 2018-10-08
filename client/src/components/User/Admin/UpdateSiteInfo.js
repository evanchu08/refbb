import React, { Component } from 'react';
import FormField from '../../UI/formfield';
import { update, generateData, isFormValid, getInfo } from '../../UI/FormAction';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSiteInfo, updateSiteInfo } from '../../../actions/site_actions';

class UpdateSiteInfo extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'Address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter the site address'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlable: true
            },
            hours: {
                element: 'input',
                value: '',
                config: {
                    label: 'Hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter the hours'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlable: true
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter the site phone number'
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlable: true
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Email',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter the site email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlable: true
            },
        }
    }
    componentDidMount() {
        this.props.dispatch(getSiteInfo())
            .then(response => {
                const newFormdata = getInfo(this.state.formdata, response.payload[0])
                this.setState({
                    formdata: newFormdata
                })
            })
    }
    submitForm(event) {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, 'register');
        let isValid = isFormValid(this.state.formdata, 'register');
        if (isValid) {
            this.props.dispatch(updateSiteInfo(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        const newFormdata = getInfo(this.state.formdata, response.payload.siteInfo[0])
                        this.setState({
                            formSuccess: true,
                            formdata: newFormdata
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    formSuccess: false
                                })
                            }, 2000)
                        })
                    } else {
                        this.setState({ formError: true })
                    }
                })
        } else {
            this.setState({ formError: true })
        }
    }

    updateForm(element) {
        let updateData = update(element, this.state.formdata, 'register');
        this.setState({
            formError: false,
            formdata: updateData
        })
    }

    render() {

        return (
            <div className="container">
                <form onSubmit={(event) => this.submitForm(event)}>
                    <h2>Site information</h2>
                    <div className="block">
                        <FormField
                            id={'address'}
                            formdata={this.state.formdata.address}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    <div className="block">
                        <FormField
                            id={'hours'}
                            formdata={this.state.formdata.hours}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    <div>
                        <FormField
                            id={'phone'}
                            formdata={this.state.formdata.phone}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    <div className="block">
                        <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>
                    <div>
                        {this.state.formSuccess ?
                            <div className="form_success">
                                Success
                                </div>
                            : null
                        }
                        {this.state.formError ?
                            <div className="error_label">
                                Please check your data
                                </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Update the site info
                            </button>
                    </div>
                </form >
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        site: state.site
    }
}

export default connect(mapStateToProps)(withRouter(UpdateSiteInfo));
