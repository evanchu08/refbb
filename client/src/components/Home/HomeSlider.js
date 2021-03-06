import React from 'react';
import Slider from 'react-slick';
import MyButton from '../UI/button';
import image1 from '../../images/guitars/hom2.jpeg';
import image2 from '../../images/guitars/home1.jpeg';

const HomeSlider = (props) => {

    const slides = [
        {
            img: image1,
            lineOne: 'Fender',
            lineTwo: 'Custom shop',
            linkTitle: 'Shop now',
            linkTo: '/shop'
        },
        {
            img: image2,
            lineOne: 'B-Stock',
            lineTwo: 'Awesome discounts',
            linkTitle: 'View offers',
            linkTo: '/shop'
        }
    ]

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    }

    const generateSlides = () => (
        slides ?
            slides.map((item, i) => (
                <div key={i}>
                    <div className="featured_image"
                        style={{
                            background: `url(${item.img})`,
                            height: `${window.innerHeight}px`
                        }}
                    >
                        <div className="featured_action">
                            <div className="tag title">{item.lineOne}</div>
                            <div className="tag low_title">{item.lineTwo}</div>
                            <div>
                                <MyButton
                                    type="default"
                                    title={item.linkTitle}
                                    linkTo={item.linkTo}
                                    addStyles={{
                                        margin: '10px 0 0 0'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ))
            : null
    )



    return (
        <div className="featured_container">
            <Slider {...settings}>
                {generateSlides()}
            </Slider>
        </div>
    );
};

export default HomeSlider;


