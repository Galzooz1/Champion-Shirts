import styled from 'styled-components';

const ModalContainer = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index:100;
  `;

export const DesktopModalContainer = styled(ModalContainer)`
  border-radius: 7px;
  box-shadow: 0 0 32px rgba(0,0,0,0.5);
  padding: 15px;
  width: 800px;
  font-size: 26px;
  `

export const MobileModalContainer = styled(ModalContainer)`
position: fixed;
bottom: 0;
left: 0;
right: 0;
width: 100%;
padding: 30px;
min-height: 150px;
font-size: 26px;
`;

export const Header = styled.h3`
color: white;
font-size: 35px;
line-height: 1em;
font-weight: 300;
text-align: center;
`

export const Message = styled.p`
color:#aaa;
font-size: 15px;
margin-top:10px;
font-weight: 500;
/* margin: 0 0 36px; */
text-align: center;
`;

export const Content = styled.div`
  padding:12px;
  position:relative;
  height:500px;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width:0.3em;
  }
  &::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #D4AA70;
    border-radius: 100px;
  }
  &::-webkit-scrollbar-thumb{
    border-radius: 100px;
    /* background-color: darkgrey; */
    background-image: linear-gradient(180deg, #D0368A 0%, #708AD4 99%);

  outline: 1px solid slategrey;
  }
`;

export const CloseSign = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: #323232;
  //creating and X using CSS
  &:before,
  &:after {
    position: absolute;
    left: 19px;
    top: 10px;
    content: ' ';
    height: 20px;
    width: 2px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
  &:hover::before,
  &:hover::after {
      background-color: red;
      color:red;
  }
`;

const CLOSE_BUTTON_SIZE = 40;

const CloseButton = styled.div`
  position: absolute;
  width: ${CLOSE_BUTTON_SIZE}px;
  height: ${CLOSE_BUTTON_SIZE}px;
  background-color: #c8c8c8;
  border-radius: 50%;
  cursor: pointer;

  //& -> any child
  & > * {
    opacity: 1;
  }
  &:hover > * {
    opacity: 0.4;
  }
`;

export const DesktopCloseButton = styled(CloseButton)`
  top: -${CLOSE_BUTTON_SIZE / 2}px;
  left: calc(100% - ${CLOSE_BUTTON_SIZE / 2}px);
`;

export const MobileCloseButton = styled(CloseButton)`
  top: -${CLOSE_BUTTON_SIZE / 2}px;
  left: calc(100% - ${CLOSE_BUTTON_SIZE * 1.5 + 10}px);
`;