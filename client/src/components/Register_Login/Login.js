import React, { Component } from 'react';
import FormField from '../UI/formfield';
import { update, generateData, isFormValid } from '../UI/FormAction';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/user_actions';

class Login extends Component {

    state = {
        formError: false,
        formErrorMessage: '',
        formSuccess: '',
        formdata: {
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
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ''
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'login');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }


    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'login');
        let formIsValid = isFormValid(this.state.formdata, 'login')

        if (formIsValid) {
            this.props.dispatch(loginUser(dataToSubmit))
                .then(response => {
                    if (response.payload.loginSuccess) {
                        this.props.history.push('/user/dashboard');
                    } else {
                        this.setState({
                            formErrorMessage: response.payload.message,
                            formError: true
                        })
                    }
                })
        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(event) => this.submitForm(event)}>

                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />

                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element) => this.updateForm(element)}
                    />

                    {this.state.formError ?
                        <div className="error_label">
                            {this.state.formErrorMessage}
                        </div>
                        : null
                    }
                    <button onClick={(event) => this.submitForm(event)}>
                        Log in
                    </button>
                    <button
                        style={{ marginLeft: '60px' }}
                        onClick={() => this.props.history.push('/reset_user')}
                    >
                        Forget password
                    </button>
                </form>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(withRouter(Login));