import React from 'react';
import Card from './Card';

const CardBlockShop = (props) => {
    const renderCards = () => (
        props.lists ?
            props.lists.map(card => (
                <Card
                    key={card._id}
                    {...card}
                    grid={props.grid}
                />
            ))
            : null
    )
    return (
        < div className="card_block_shop" >
            <div>
                <div>
                    {props.lists ?
                        props.lists.length === 0 ?
                            <div className="no_result">
                                Sorry, no results
                            </div>
                            : null
                        : null}
                    {renderCards(props.lists)}
                </div>
            </div>
        </div >
    )
}

export default CardBlockShop


