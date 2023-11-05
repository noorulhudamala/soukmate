import React, { useEffect, useRef } from 'react';
import './Banner.scss';
import BannerImg from '../../assets/images/banner.png';

const Banner: React.FC = () => {
    const imageRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (imageRef.current) {
            imageRef.current.style.transform = 'translateX(0)';
            imageRef.current.style.opacity = '1';
        }
        if (textRef.current) {
            textRef.current.style.transform = 'translateY(0)';
            textRef.current.style.opacity = '1';
        }
    }, []);

    return (
        <div className="shoes-banner">
            <img
                ref={imageRef}
                src={BannerImg} // Replace with your image path
                alt="Shoes Collection"
                className="banner-image"
            />
            <div ref={textRef} className="banner-content">
                <h1>Stride with Style - Where Comfort Meets Cool</h1>
                <p>Stride in style with our curated shoe haven. Comfort pairs with trendsetting designs to take your every step from ordinary to standout.</p>
                <button className="shop-now-btn">Shop Now</button>
            </div>
        </div>
    );
};

export default Banner;
