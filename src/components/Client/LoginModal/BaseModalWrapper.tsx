import React, { MouseEventHandler, ReactNode } from 'react';
import Modal from './Modal';
import { CloseSign , Header, Message } from './ModalPopup.style';

export interface BaseModalWrapperProps {
    isModalVisble: boolean;
    onBackdropClick: () => void;
    header: string;
    message?: string;
    content?: ReactNode;
};

interface ComponentsProps {
    ContainerComponent: React.ComponentType<{}>;
    CloseButtonComponent: React.ComponentType<{
      onClick?: MouseEventHandler<any>
    }>;
  }

//Combine two interface props to one type props
type Props = BaseModalWrapperProps & ComponentsProps;

const BaseModalWrapper: React.FC<Props> = ({onBackdropClick, isModalVisble, header, message, content, ContainerComponent, CloseButtonComponent}) => {
    if(!isModalVisble){
        return null
    }
    return(
        <Modal onBackdropClick={onBackdropClick}>
            <ContainerComponent>
                <CloseButtonComponent onClick={onBackdropClick}>
                <CloseSign data-tip="change the color to red when hover" />
                </CloseButtonComponent>
                {/* <CloseButtonComponent>
                </CloseButtonComponent> */}
                <Header>{header}</Header>
                {message && <Message>{message}</Message>}
                {content}
            </ContainerComponent>
        </Modal>
    )
}

export default BaseModalWrapper