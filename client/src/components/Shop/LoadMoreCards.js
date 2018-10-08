import React from 'react';
import CardBlockShop from '../UI/cardBlockShop';

const LoadMoreCards = (props) => {
    return (
        <div>
            <div>
                <CardBlockShop
                    grid={props.grid}
                    lists={props.lists}
                />
            </div>
            {
                props.size >= props.limit ?
                    <div className="load_more_container">
                        <span onClick={() => props.loadMore()}>
                            Load More
	                    </span>
                    </div>
                    : null
            }
        </div>
    )
}

export default LoadMoreCards