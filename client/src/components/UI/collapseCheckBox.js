import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';


class CollapseCheckBox extends Component {
    state = {
        open: false,
        checked: []
    }
    ComponentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }
    handleClick = () => (
        this.setState({ open: !this.state.open })
    )
    renderList = () => (
        this.props.lists ?
            this.props.lists.map(list => (
                <ListItem key={list._id} style={{ padding: '10px 0' }}>
                    <ListItemText primary={list.name} />
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onChange={this.handleToggle(list._id)}
                            check={this.state.checked.indexOf(list._id) !== -1 ? 'true' : 'false'}
                        />
                    </ListItemSecondaryAction>
                </ListItem >
            ))
            : null
    )
    handleToggle = (id) => () => {
        const { checked } = this.state;
        const checkIndex = checked.indexOf(id)
        const newChecked = [...checked]
        if (checkIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(checkIndex, 1);
        }
        this.setState({
            checked: newChecked
        }, () => {
            this.props.handleFilter(newChecked);
        })
    }


    handleAngle = () => (
        this.state.open ?
            <FontAwesomeIcon
                icon={faAngleUp}
                className="icon"
            />
            :
            <FontAwesomeIcon
                icon={faAngleDown}
                className="icon"
            />
    )
    render() {
        return (
            <div className="collape_items_wrapper">
                <List style={{ borderBottom: '1px solid #dbdbdb' }}>
                    <ListItem onClick={this.handleClick} style={{ padding: '10px 23px 10px 0' }}>
                        <ListItemText
                            primary={this.props.title}
                            className="collapse_title"
                        />
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.renderList()}
                        </List>
                    </Collapse>
                </List >
            </div >
        )
    }
}


export default CollapseCheckBox