import React, { MouseEventHandler } from 'react';
import Modal from './Modal';
import { CloseSign , Header, Message, DesktopModalContainer, DesktopCloseButton } from './ModalPopup.style';

export interface BaseModalWrapperProps {
    isModalVisble: boolean;
    onBackdropClick: () => void;
    header: string;
    message?: string;
};

interface ComponentsProps {
    ContainerComponent: React.ComponentType<{}>;
    CloseButtonComponent: React.ComponentType<{
      onClick?: MouseEventHandler<any>
    }>;
  }

//Combine two interface props to one type props
type Props = BaseModalWrapperProps & ComponentsProps;

const BaseModalWrapper: React.FC<Props> = ({onBackdropClick, isModalVisble, header, message, ContainerComponent, CloseButtonComponent}) => {
    if(!isModalVisble){
        return null
    }
    return(
        <Modal onBackdropClick={onBackdropClick}>
            <DesktopModalContainer>
                <DesktopCloseButton onClick={onBackdropClick}>
                <CloseSign />
                </DesktopCloseButton>
                {/* <CloseButtonComponent>
                </CloseButtonComponent> */}
                <Header>{header}</Header>
                {message && <Message>{message}</Message>}
            </DesktopModalContainer>
        </Modal>
    )
}

export default BaseModalWrapper