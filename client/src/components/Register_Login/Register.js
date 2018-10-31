import React, { Component } from 'react';
import FormField from '../UI/formfield';
import { update, generateData, isFormValid } from '../UI/FormAction';
import { withRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/user_actions';

class Register extends Component {
    state = {
        formError: false,
        formErrorMessage: '',
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            lastname: {
                element: 'input',
                value: '',
                config: {
                    name: 'lastname_input',
                    type: 'text',
                    placeholder: 'Enter your lastname'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                validation: {
                    required: true,
                    length: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            },
            confirmPassword: {
                element: 'input',
                value: '',
                config: {
                    name: 'confirm_password_input',
                    type: 'password',
                    placeholder: 'confirm your password'
                },
                validation: {
                    required: true,
                    confirm: 'password'
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }
    submitForm(event) {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, 'register');
        let isValid = isFormValid(this.state.formdata, 'register');
        if (isValid) {
            console.log(dataToSubmit)
            this.props.dispatch(registerUser(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        this.setState({
                            formError: false,
                            formSuccess: true
                        })
                        setTimeout(() => {
                            this.props.history.push('/register_login');
                        }, 2000)
                    } else {
                        this.setState({
                            formErrorMessage: response.payload.message,
                            formError: true
                        })
                    }
                }).catch(err => {
                    this.setState({ formError: true })
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
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(event) => this.submitForm(event)}>
                                <h2>Personal information</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                            id={'name'}
                                            formdata={this.state.formdata.name}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                            id={'lastname'}
                                            formdata={this.state.formdata.lastname}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <FormField
                                        id={'email'}
                                        formdata={this.state.formdata.email}
                                        change={(element) => this.updateForm(element)}
                                    />
                                </div>
                                <h2>Verify password</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                            id={'password'}
                                            formdata={this.state.formdata.password}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                            id={'confirmPassword'}
                                            formdata={this.state.formdata.confirmPassword}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    {this.state.formError ?
                                        <div className="error_label">
                                            {this.state.formErrorMessage ? this.state.formErrorMessage : 'please check your data'}
                                        </div>
                                        : null}
                                    <button onClick={(event) => this.submitForm(event)}>
                                        Create an account
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.formSuccess}>
                    <div className="dialog_alert">
                        <div>Congratulations !!</div>
                        <div>
                            You will be redirected to the LOGIN in a few seconds...
		                </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(withRouter(Register));

