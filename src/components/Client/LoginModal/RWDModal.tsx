import React from 'react';
import MediaQuery from 'react-responsive';
import BaseModalWrapper, { BaseModalWrapperProps } from './BaseModalWrapper';
import { DesktopCloseButton, DesktopModalContainer, MobileCloseButton, MobileModalContainer } from './ModalPopup.style';

type RWDModalProps = BaseModalWrapperProps;

const RWDModal: React.FC<RWDModalProps> = (props) => {
    return(
        <MediaQuery minWidth={600}>
        {
            (matches: any) => matches ? (
            <BaseModalWrapper 
                CloseButtonComponent={DesktopCloseButton}
                ContainerComponent={DesktopModalContainer}
                {...props}
            />
        ) : (
            <BaseModalWrapper 
            CloseButtonComponent={MobileCloseButton}
            ContainerComponent={MobileModalContainer}
            {...props}
        />
        )
        }
        </MediaQuery>
    )
}

export default RWDModal