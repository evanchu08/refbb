import React, { Component } from 'react';
import UserLayout from '../../../hoc/UserLayout';
import FormField from '../../UI/formfield';
import { getBRANDS, getWOODS, addProduct, clearProduct } from '../../../actions/product_actions';
import { populateOptionFields } from '../../UI/FormAction';
import { update, generateData, isFormValid, resetFormdata } from '../../UI/FormAction';
import FileUpload from '../../UI/Form/fileUpload';

class AddProduct extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product name',
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            description: {
                element: 'textarea',
                value: '',
                config: {
                    label: 'Product description',
                    name: 'description_input',
                    type: 'text',
                    placeholder: 'Enter your description'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            price: {
                element: 'input',
                value: '',
                config: {
                    label: 'Product price',
                    name: 'price_input',
                    type: 'number',
                    placeholder: 'Enter your price'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            brand: {
                element: 'select',
                value: '',
                config: {
                    label: 'Product Brand',
                    name: 'brands_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            shipping: {
                element: 'select',
                value: '',
                config: {
                    label: 'Shipping',
                    name: 'shipping_input',
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' },
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            available: {
                element: 'select',
                value: '',
                config: {
                    label: 'Available, in stock',
                    name: 'available_input',
                    options: [
                        { key: true, value: 'Yes' },
                        { key: false, value: 'No' },
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            wood: {
                element: 'select',
                value: '',
                config: {
                    label: 'Wood material',
                    name: 'wood_input',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            frets: {
                element: 'select',
                value: '',
                config: {
                    label: 'Frets',
                    name: 'frets_input',
                    options: [
                        { key: 20, value: 20 },
                        { key: 21, value: 21 },
                        { key: 22, value: 22 },
                        { key: 24, value: 24 }
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            publish: {
                element: 'select',
                value: '',
                config: {
                    label: 'Publish',
                    name: 'publish_input',
                    options: [
                        { key: true, value: 'Public' },
                        { key: false, value: 'Hidden' },
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showlabel: true
            },
            images: {
                value: [],
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                validationMessage: '',
                showlabel: false
            }
        }
    }
    updateFormData = (newFormData) => {
        this.setState({ formdata: newFormData })
    }

    componentDidMount() {
        this.props.dispatch(getBRANDS())
            .then(response => {
                const newFormData = populateOptionFields(this.state.formdata, response.payload, 'brand')
                this.updateFormData(newFormData)
            })
        this.props.dispatch(getWOODS())
            .then(response => {
                const newFormData = populateOptionFields(this.state.formdata, response.payload, 'wood')
                this.updateFormData(newFormData)
            })

    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'products');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
        setTimeout(() => {
            this.setState({
                formSuccess: false
            }, () => this.props.dispatch(clearProduct()))
        }, 5000)
    }

    resetFieldHandler = () => {
        const NewFormdata = resetFormdata(this.state.formdata, 'products')
        this.setState({
            formdata: NewFormdata,
            formSuccess: true
        })
    }

    submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(this.state.formdata, 'products');
        let formIsValid = isFormValid(this.state.formdata, 'products')
        if (formIsValid) {
            this.props.dispatch(addProduct(dataToSubmit))
                .then(response => {
                    if (response.payload.success) {
                        this.resetFieldHandler();
                    } else {
                        this.setState({
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

    imagesHandler = (images) => {
        const newFormdata = { ...this.state.formdata };
        newFormdata['images'].value = images;
        newFormdata['images'].valid = true;
        this.setState({ formdata: newFormdata })
    }

    render() {
        return (
            <UserLayout>
                <div>
                    <h1>Add product</h1>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <FileUpload
                            imagesHandler={(images) => this.imagesHandler(images)}
                            reset={this.state.formSuccess}
                        />
                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'description'}
                            formdata={this.state.formdata.description}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'price'}
                            formdata={this.state.formdata.price}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>

                        <FormField
                            id={'brand'}
                            formdata={this.state.formdata.brand}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>

                        <FormField
                            id={'shipping'}
                            formdata={this.state.formdata.shipping}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'available'}
                            formdata={this.state.formdata.available}
                            change={(element) => this.updateForm(element)}
                        />

                        <div className="form_devider"></div>
                        <FormField
                            id={'wood'}
                            formdata={this.state.formdata.wood}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'frets'}
                            formdata={this.state.formdata.frets}
                            change={(element) => this.updateForm(element)}
                        />

                        <FormField
                            id={'publish'}
                            formdata={this.state.formdata.publish}
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
                            Add product
                        </button>
                    </form>
                </div>
            </UserLayout >
        )
    }
}

export default AddProduct