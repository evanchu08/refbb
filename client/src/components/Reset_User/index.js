import React, { Component } from 'react';
import FormField from '../UI/formfield';
import { update, generateData, isFormValid } from '../UI/FormAction';
import { withRouter } from 'react-router-dom';
import { resetUser } from '../../actions/user_actions';
import { connect } from 'react-redux';

class ResetUser extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formErrorMessage: '',
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
            this.props.dispatch(resetUser(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        this.setState({
                            formSuccess: true
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    formSuccess: false
                                })
                            }, 3000)
                        })
                    } else {
                        this.setState({
                            formError: true,
                            formErrorMessage: response.payload.message
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
            <div className="container">
                <form onSubmit={(event) => this.submitForm(event)}>
                    <h2>Reset password</h2>
                    <div className="block">
                        <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element) => this.updateForm(element)}
                        />
                    </div>

                    <div>
                        {
                            this.state.formSuccess ?
                                <div className="form_success">
                                    Please check your email
                                </div>
                                : null
                        }
                        {this.state.formError ? this.state.formErrorMessage ?
                            <div className="error_label">
                                {this.state.formErrorMessage}
                            </div> :
                            <div className="error_label">
                                Please check your data
                            </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Reset password
                        </button>
                    </div>
                </form>
            </div >
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(ResetUser));
