import React, { Component } from 'react';
import FormField from '../../UI/formfield';
import { update, generateData, isFormValid, getInfo } from '../../UI/FormAction';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUserInfo } from '../../../actions/user_actions';

class UpdatePersonInfo extends Component {
    state = {
        formError: false,
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
            }
        }
    }

    submitForm(event) {
        event.preventDefault();
        let dataToSubmit = generateData(this.state.formdata, 'update_user');
        let isValid = isFormValid(this.state.formdata, 'update_user')
        if (isValid) {
            this.props.dispatch(updateUserInfo(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        this.setState({
                            formSuccess: true
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    formSuccess: false
                                })
                            }, 2000)
                        })
                    }
                })
        } else {
            this.setState({ formError: true })
        }
    }

    updateForm(element) {
        let updateData = update(element, this.state.formdata, 'update_user');
        this.setState({
            formError: false,
            formdata: updateData
        })
    }
    componentDidMount() {
        const newFormdata = getInfo(this.state.formdata, this.props.user.userData);
        this.setState({
            formdata: newFormdata
        })
    }
    render() {
        return (
            <div>
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

                    <div>
                        {
                            this.state.formSuccess ?
                                <div className="form_success">Success</div>
                                : null
                        }
                        {this.state.formError ?
                            <div className="error_label">
                                Please check your data
                                        </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Update person info
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

export default connect(mapStateToProps)(withRouter(UpdatePersonInfo));
