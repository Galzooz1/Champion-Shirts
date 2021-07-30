import styled from 'styled-components'

const InputWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  input {
    display: block;
    background-color: white;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

export const InputContainer = styled(InputWrapper)`
  margin-bottom: 10px;
  width: 100%;
  font-size: 60%;
  border: 1px solid grey;
  padding: 5px;
`
export const IconContainer = styled.div`
  width: 33px;
  padding-left: 3px;
  border-radius: 10px;
  margin-right:6px;
`;

export const ModalInput = styled.input`
  display: inline-block;
  outline: none;
  padding: 5px 0;
  margin: 5px 0;
  width: 100%;
  text-indent: 8px;
`;

export const LabelContainer = styled.label`
    font-size: 16px;
    color:#D6AF05;
`