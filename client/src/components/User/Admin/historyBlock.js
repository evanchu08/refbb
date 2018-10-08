import React from 'react';
import moment from 'moment';

const UserHistoryBlock = ({ history }) => {
    const renderBlock = () => (

        history ?
            history.map((item, i) => (
                < tr key={i} >
                    <th>{item.poorder}</th>
                    <th>{moment(item.dateOfPurchase).format("MM-DD-YYYY")}</th>
                    <th>{item.name}</th>
                    <th>{item.price}</th>
                    <th>{item.quantity}</th>
                </tr >
            ))
            : null
    )
    return (
        <div className="history_blocks">
            <table>
                <thead>
                    <tr>
                        <th>Order number</th>
                        <th>Date of purchase</th>
                        <th>Product</th>
                        <th>Price per item</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {renderBlock()}
                </tbody>
            </table>
        </div>
    )
}

export default UserHistoryBlock