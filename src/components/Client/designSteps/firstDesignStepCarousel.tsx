import React from 'react';
import Slider from 'react-slick';
import { IProdItems } from '../../Admin/interfaces/prodItems';
import { URL_API } from '../../services/apiService';
import Loading from '../loading';
import '../css/singleProductDesign.css';


interface FirstDesignStepCarouselProps {
    productData: Partial<IProdItems>;
    indexPicked?: number;
};

function SampleArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, width: "20px", height: "20px", display: "block", borderRadius: "6px", background: "rgba(33, 37, 41, 0.397)" }}
            onClick={onClick}
        />
    );
}

const SliderSettings = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    nextArrow: <SampleArrow />,
    prevArrow: <SampleArrow />,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
}

const FirstDesignStepCarousel: React.FC<FirstDesignStepCarouselProps> = ({ productData, indexPicked }) => {
    return (
        <>
            {productData.properties?.length === 0 ?
                <Loading />
                :
                <div className="mx-5">
                    {productData.properties?.map((item, i) => {
                        return (
                            <>
                                {indexPicked === i ?
                                    <>
                                        <div style={{ width: "350px", height:"550px" }}>
                                            <Slider {...SliderSettings}>
                                                {item.frontImg?.includes("http") ?
                                                <img className="border rounded-2 shadow mb-4" src={item.frontImg} alt={productData?.name} />
                                                :
                                                <img className="border rounded-2 shadow mb-4" src={URL_API + item.frontImg + "?" + Date.now()} height="400px" width="100%" alt={productData?.name} />
                                                }
                                                {item.backImg?.includes("http") ?
                                                <img className="border rounded-2 shadow mb-4" src={item.backImg} alt={productData?.name} />
                                                :
                                                <img className="border rounded-2 shadow mb-4" src={URL_API + item.backImg + "?" + Date.now()} height="400px" width="100%" alt={productData?.name} />
                                                }
                                                {productData?.image?.includes("http") ?
                                                <img className="border rounded-2 shadow mb-4" src={productData.image} alt={productData?.name} />
                                                :
                                                <img className="border rounded-2 shadow mb-4" src={URL_API + productData.image + "?" + Date.now()} height="400px" width="100%" alt={productData?.name} />
                                                }
                                            </Slider>
                                        </div>
                                    </>
                                    : null
                                    // <img className="border rounded-2 shadow mb-4" src={productData?.image} alt={productData?.name} width="400" />
                                }
                            </>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default FirstDesignStepCarousel