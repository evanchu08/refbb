import React from 'react';
import Card from './Card';

const CardBlock = ({ lists, title }) => {
    const renderCards = (lists) => (
        lists ?
            lists.map((list, i) => (
                <Card
                    key={i}
                    {...list}
                />
            )) : null
    )

    return (
        <div className="card_block">
            <div className="container">
                {title ?
                    <div className="title">
                        {title}
                    </div> : null}
                <div style=
                    {{ display: 'flex', flexWrap: 'wrap' }}
                >
                    {renderCards(lists)}
                </div>
            </div>
        </div>
    )
}

export default CardBlock