import React from 'react';
import image from '../../images/guitars/home3.jpg';
import MyButton from '../UI/button';


const HomePromotion = () => {
    const promotion = {
        img: image,
        lineOne: 'Up to 40% off',
        lineTwo: 'In second hand guitars',
        linkTitle: 'Shop now',
        linkTo: '/shop'
    }

    const renderPromotion = () => (
        promotion ?
            <div className="home_promotion_img"
                style={{ background: `url(${promotion.img})` }}
            >
                <div className="tag title">{promotion.lineOne}</div>
                <div className="tag low_title">{promotion.lineTwo}</div>
                <div>
                    <MyButton
                        type="default"
                        title={promotion.linkTitle}
                        linkTo={promotion.linkTo}
                        addStyles={{
                            margin: '10px 0 0 0'
                        }}
                    />
                </div>
            </div>
            : null
    )
    return (
        <div className="home_promotion">
            {renderPromotion()}
        </div>
    )
}

export default HomePromotion;
