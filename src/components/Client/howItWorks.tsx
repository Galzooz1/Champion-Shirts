import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import { DesignedH2, DesignedLine } from './userPanel';
import StepOne from '../../assets/StepOne.png';
import StepTwo from '../../assets/StepTwo.png';
import StepThree from '../../assets/StepThree.png';
import { motion } from 'framer-motion';
import './css/howitworks.css';



interface HowItWorksProps {

};

const BoxDiv = styled.div`
/* width:10%; */
background-color: #FA3165;
/* background-color: #487686; */
`;

const HowItWorks: React.FC<HowItWorksProps> = () => {
    let [sliderOne, setSliderOne] = React.useState();
    let slider1 = React.useRef<Slider | null>(null);
    let slider2 = React.useRef<Slider | null>(null);
    let [sliderTwo, setSliderTwo] = React.useState<any>({
        nav1: null,
        nav2: null
    });

    React.useEffect(() => {
        setSliderTwo({
            nav1: slider1.current,
            nav2: slider2.current,
        })
    }, []);

    return (
        <>
            <div className="container-fluid howitworks">
                <div className="w-75 mx-auto">
                <DesignedH2>How it works</DesignedH2>
                <DesignedLine>
                </DesignedLine>
                </div>
                <div style={{height:"950px"}} className="d-flex justify-content-between p-2">
                    <div className="col-lg-3 mt-5">
                        <Slider
                            className="center"
                            asNavFor={sliderTwo.nav1}
                            ref={slider => (slider2.current = slider)}
                            slidesToShow={3}
                            swipeToSlide={true}
                            focusOnSelect={true}
                            vertical={true}
                            verticalSwiping={true}
                        // adaptiveHeight={true}
                        // centerPadding={"60px"}
                        // centerMode={true}
                        // rows={1}
                        // slidesPerRow={1}
                        // autoplay={true}
                        >
                            <div className="mt-5 d-flex justify-content-center">
                                <BoxDiv className="text-white">
                                    <motion.img whileHover={{ scale: 1.05 }} src={StepOne} className="shadow rounded-3" style={{ backgroundSize: "cover", backgroundPosition: "center", width: "400px", position: "relative", top: "-30px", left: "40px", cursor: "pointer" }} alt="Step One" />
                                </BoxDiv>
                            </div>
                            <div className="mt-5 d-flex justify-content-center">
                                <BoxDiv className="text-white">
                                    <motion.img whileHover={{ scale: 1.05 }} src={StepTwo} className="shadow rounded-3" style={{ backgroundSize: "cover", backgroundPosition: "center", width: "400px", position: "relative", top: "-30px", left: "40px", cursor: "pointer" }} alt="Step One" />
                                </BoxDiv>
                            </div>
                            <div className="mt-5 d-flex justify-content-center">
                                <BoxDiv className="text-white">
                                    <motion.img whileHover={{ scale: 1.05 }} src={StepThree} className="shadow rounded-3" style={{ backgroundSize: "cover", backgroundPosition: "center", width: "400px", position: "relative", top: "-30px", left: "40px", cursor: "pointer" }} alt="Step One" />
                                </BoxDiv>
                            </div>
                        </Slider>
                    </div>
                    <div className="col-lg-9 mt-5">
                        <Slider
                            asNavFor={sliderTwo.nav2}
                            ref={slider => (slider1.current = slider)}
                        // autoplay={true}
                        >   <div>
                                <h2>Step 1:</h2>
                                <div className="w-100 d-flex justify-content-center">
                                    <motion.img src={StepOne} className="shadow rounded-3 border" style={{ backgroundSize: "cover", backgroundPosition: "center", width: "1391px", height: "900px", objectFit: "cover" }} alt="Step One" />
                                </div>
                            </div>
                            <div>
                                <h2>Step 2:</h2>
                                <div className="w-100 d-flex justify-content-center">
                                    <motion.img src={StepTwo} className="shadow rounded-3 border" style={{ backgroundSize: "cover", backgroundPosition: "center", width: "1391px", height: "900px", objectFit: "cover" }} alt="Step Two" />
                                </div>
                            </div>
                            <div>
                                <h2>Step 3:</h2>
                                <div className="w-100 d-flex justify-content-center">
                                    <motion.img src={StepThree} className="shadow rounded-3 border" style={{ backgroundSize: "cover", backgroundPosition: "center", width: "1391px", height: "900px", objectFit: "cover" }} alt="Step Three" />
                                </div>
                            </div>
                        </Slider>
                    </div>

                </div>
            </div>
        </>
    )
}

export default HowItWorks