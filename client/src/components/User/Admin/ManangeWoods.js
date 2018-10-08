import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FormField from '../../UI/formfield';
import { getWOODS, addWOOD } from '../../../actions/product_actions';
import { update, generateData, isFormValid, resetFormdata } from '../../UI/FormAction';

class ManangeWoods extends Component {
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
                    placeholder: 'Enter the wood'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
            }
        }
    }
    componentDidMount() {
        this.props.dispatch(getWOODS())
    }
    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'woods');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
        setTimeout(() => {
            this.setState({
                formSuccess: false
            })
        }, 3000)
    }
    resetFieldHandler = () => {
        const newFormdata = resetFormdata(this.state.formdata, 'addWoods')
        this.setState({
            formdata: newFormdata,
            formSuccess: true
        })
    }
    showWoods = () => (
        this.props.product.woods ?
            this.props.product.woods.map(item => (
                <div
                    className="category_item"
                    key={item._id}
                >
                    {item.name}
                </div>
            ))
            : null
    )

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'woods');
        let formIsValid = isFormValid(this.state.formdata, 'woods')
        let existingWoods = this.props.product.woods;

        if (formIsValid) {
            this.props.dispatch(addWOOD(dataToSubmit, existingWoods))
                .then(response => {
                    if (response.payload.success) {
                        this.resetFieldHandler();
                    } else {
                        this.setState({ formError: true })
                    }
                })
        } else {
            this.setState({
                formError: true
            })
        }
    }

    render() {
        console.log(this.props.product.woods)
        return (
            <div className="admin_category_wrapper">
                <h1>Woods</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showWoods()}
                        </div>
                    </div>
                    <div className="right">
                        <h1>Add wood</h1>
                        <form onSubmit={(event) => this.submitForm(event)}>
                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => this.updateForm(element)}
                            />

                            {this.state.formSuccess ?
                                <div className="form_success">
                                    Success
                                </div>
                                : null}

                            {this.state.formError ?
                                <div className="error_label">
                                    Please check your data
                                </div>
                                : null}
                            <button onClick={(event) => this.submitForm(event)}>
                                Add brand
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        product: state.product
    }
}
export default connect(mapStateToProps)(withRouter(ManangeWoods));
