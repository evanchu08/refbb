import React, { Component } from 'react';
import PageTop from '../UI/PageTop';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getBRANDS, getWOODS, getProductsToShop } from '../../actions/product_actions';
import CollapseCheckBox from '../UI/collapseCheckBox';
import CollapseCheckBox1 from '../UI/collapseCheckBox1';
import CollapseRadioButton from '../UI/collapseRadioButton';
import { frets, price } from '../UI/Form/fixed_category';
import LoadMoreCards from './LoadMoreCards';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';
import CircularProgress from '@material-ui/core/CircularProgress';

class Shop extends Component {
    state = {
        grid: '',
        limit: 6,
        skip: 0,
        filters: {
            brand: [],
            frets: [],
            wood: [],
            price: []
        }
    }
    componentDidMount() {
        this.props.dispatch(getBRANDS());
        this.props.dispatch(getWOODS());
        this.props.dispatch(getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        ))
    }
    handlePrice = (value) => {
        const data = price;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    handleFilter = (filters, category) => {
        const newFilters = { ...this.state.filters }
        newFilters[category] = filters;
        if (category === 'price') {
            newFilters[category] = this.handlePrice(filters);
        }
        this.showFilteredResults(newFilters)
        this.setState({ filters: newFilters })
    }

    showFilteredResults = (filters) => {
        this.props.dispatch(getProductsToShop(
            0,
            this.state.limit,
            filters
        )).then(() => {
            this.setState({
                skip: 0
            })
        })
    }
    LoadMoreCards = () => {
        let skip = this.state.skip + this.state.limit
        this.props.dispatch(getProductsToShop(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.product.toShop
        )).then(() => {
            this.setState({
                skip
            })
        })
    }

    handleGrid = () => {
        this.setState({
            grid: !this.state.grid ? 'grid_bars' : ''
        })
    }

    render() {
        const product = this.props.product
        return (
            <div>
                <PageTop
                    title="Browse Products"
                />
                <div className="container">
                    {
                        product ?
                            <div className="shop_wrapper">
                                <div className="left">
                                    <CollapseCheckBox1
                                        initState={true}
                                        title="Brand"
                                        lists={product.brands}
                                        handleFilter={(filters) => this.handleFilter(filters, 'brand')}
                                    />
                                    <CollapseCheckBox
                                        initState={false}
                                        title="Frets"
                                        lists={frets}
                                        handleFilter={(filters) => this.handleFilter(filters, 'frets')}
                                    />
                                    <CollapseCheckBox
                                        initState={false}
                                        title="Wood"
                                        lists={product.woods}
                                        handleFilter={(filters) => this.handleFilter(filters, 'wood')}
                                    />
                                    <CollapseRadioButton
                                        initState={true}
                                        title="Price"
                                        lists={price}
                                        handleFilter={(filters) => this.handleFilter(filters, 'price')}
                                    />
                                </div>
                                <div className="right">
                                    <div className="shop_options">
                                        <div className="shop_grids clear">
                                            <div
                                                className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                                                onClick={() => this.handleGrid()}
                                            >
                                                <FontAwesomeIcon icon={faTh} />
                                            </div>
                                            <div
                                                className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                                                onClick={() => this.handleGrid()}
                                            >
                                                <FontAwesomeIcon icon={faBars} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ clear: 'both' }}>
                                        <LoadMoreCards
                                            grid={this.state.grid}
                                            limit={this.state.limit}
                                            size={product.toShopSize}
                                            lists={product.toShop}
                                            loadMore={() => this.LoadMoreCards()}
                                        />
                                    </div>
                                </div>
                            </div>
                            : <CircularProgress style={{ color: '#FF00FF' }} thickness={10} />
                    }
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

export default connect(mapStateToProps)(withRouter(Shop));

