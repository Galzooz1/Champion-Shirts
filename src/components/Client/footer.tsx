import React from 'react';
import styled from 'styled-components';

interface FooterProps {

};

const FooterWrapper = styled.div`
height:189px;
background-color: #292D40;
display: flex;
justify-content: space-between;
align-items: flex-end;
width:100%;
`;

const Footer: React.FC<FooterProps> = () => {
    return (
        <FooterWrapper>
            <div className="container d-flex justify-content-between">
                <img src={"https://upload.wikimedia.org/wikipedia/commons/5/57/Paypa.png"} width="300" alt="mastercard" />
                <div className="text-white mb-3">
                    <div>
                        <a className="text-white text-decoration-none" href="#">Help</a>
                    </div>
                    <div>
                        <a className="text-white text-decoration-none" href="#">Deliveries</a>
                    </div>
                    <div>
                        <a className="text-white text-decoration-none" href="#">Products</a>
                    </div>
                    <div>
                        <a className="text-white text-decoration-none" href="#">About</a>
                    </div>
                    <div>
                        <a className="text-white text-decoration-none" href="#">Gift Card</a>
                    </div>
                </div>
                <div className="d-flex justify-content-around w-25 align-items-end mb-4">
                    <div>
                        <img className="rounded-circle" src="https://toppng.com/uploads/preview/logo-twitter-11549535419aik8i3pkro.png" width="40" />
                    </div>
                    <div>
                        <img className="rounded-circle" src="data:image/png;base64,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" width="40" />
                    </div>
                    <div>
                        <img className="rounded-circle" src="https://cdn.icon-icons.com/icons2/642/PNG/512/facebook_icon-icons.com_59205.png" width="40" />

                    </div>
                    <div>
                        <img className="rounded-circle" src="https://toppng.com/uploads/preview/instagram-color-icon-instagram-social-media-png-instagram-icon-11562851673w81euu4rop.png" width="40" />

                    </div>
                    <div>
                        <img className="rounded-circle" src="https://e7.pngegg.com/pngimages/720/526/png-clipart-viber-logo-whatsapp-computer-icons-instant-messaging-mobile-phones-icon-whatsapp-symbol-text-logo-thumbnail.png" width="40" />

                    </div>
                </div>
            </div>
        </FooterWrapper>
    )
}

export default Footer