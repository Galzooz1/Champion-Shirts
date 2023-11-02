import React, { useState
 } from 'react';
import styled from 'styled-components';
import { DesignedH2, DesignedLine } from './userPanel';
import StepOne from '../../assets/StepOne.png';
import StepTwo from '../../assets/StepTwo.png';
import StepThree from '../../assets/StepThree.png';
import { motion } from 'framer-motion';
import './css/howitworks.css';
import RWDModal from './LoginModal/RWDModal';



interface HowItWorksProps {

};

const BoxDiv = styled.div`
/* width:10%; */
background-color: #FA3165;
/* background-color: #487686; */
`;
const ContainerDiv = styled.div`
    padding: 0.5rem;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-wrap: wrap;
`;

const HowItWorks: React.FC<HowItWorksProps> = () => {
    let [isModalVisible, setisModalVisible] = useState<boolean>(false);

    const [stepChecked, setStepChecked] = useState<number | null>(null)

    const onClose = () => {
        setisModalVisible(false)
    }

    const toggleModal = (number: number) => {
        setStepChecked(number)
        setisModalVisible(wasModalVisible => !wasModalVisible);
    }




    return (
        <>
            <div className="container-fluid howitworks">
                <div className="w-75 mx-auto">
                    <DesignedH2>How it works</DesignedH2>
                    <DesignedLine>
                    </DesignedLine>
                </div>
                <ContainerDiv>
                        <div className="box mx-5 d-flex justify-content-center">
                            <BoxDiv
                                onClick={() => toggleModal(1)}
                                className="text-white">
                                <motion.img whileHover={{ scale: 1.05 }} src={StepOne} className="shadow rounded-3" alt="Step One" />
                            </BoxDiv>
                        </div>
                        <div className="box mx-5 d-flex justify-content-center">
                            <BoxDiv
                                onClick={() => toggleModal(2)}
                                className="text-white">
                                <motion.img whileHover={{ scale: 1.05 }} src={StepTwo} className="shadow rounded-3" alt="Step One" />

                            </BoxDiv>
                        </div>
                        <div className="box mx-5 d-flex justify-content-center">
                            <BoxDiv
                                onClick={() => toggleModal(3)}
                                className="text-white">
                                <motion.img whileHover={{ scale: 1.05 }} src={StepThree} className="shadow rounded-3" alt="Step One" />
                            </BoxDiv>
                        </div>
                        <RWDModal
                            onBackdropClick={onClose}
                            isModalVisble={isModalVisible}
                            header={
                                (stepChecked === 1 ?
                                    "Choose Your Shirt" :
                                    (
                                        stepChecked === 2 ?
                                            "Design Your Style"
                                            : "That's it, Check it Out"
                                    )

                                )

                            }
                            content=
                            {
                                (stepChecked === 1 ?
                                    <img src={StepOne} className="w-100 h-100" alt="Step One" /> :
                                    (
                                        stepChecked === 2 ?
                                            <img src={StepTwo} className="w-100 h-100" alt="Step Two" />
                                            : <img src={StepThree} className="w-100 h-100" alt="Step Three" />
                                    )

                                )
                            }
                        />
                </ContainerDiv>
            </div>
        </>
    )
}

export default HowItWorks