import { motion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom'
import styled from 'styled-components'

interface ModalProps {
    //Closes the modal when clicked outside the modal
    onBackdropClick: () => void;
};

const Overlay = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index:100;
`

const backdrop = {
    visible: {opacity: 1},
    hidden: {opacity: 0}
}

const Modal: React.FC<ModalProps> = ({onBackdropClick, children}) => {
    //Creates a portal. Portals provide a way to render children into a DOM node that exists outside the hierarchy of the DOM component.
    return ReactDOM.createPortal(
        <Overlay variants={backdrop} animate="visible" initial="hidden" onClick={onBackdropClick}>
            {/* Preventing the modal from disappear if clicked */}
            <div onClick={e => e.stopPropagation()}>
            {children}
            </div>
        </Overlay>,
        // ! -> It is a way to tell the compiler "this expression cannot be null or undefined here, so don't complain about the possibility of it being null or undefined."
        document.getElementById('modal-root')!
    )
}

export default Modal