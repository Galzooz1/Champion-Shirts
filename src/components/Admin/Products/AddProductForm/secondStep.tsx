import React from 'react';
import { InputContainer, LabelContainer } from '../../../Client/LoginModal/InputWithIcon';

interface SecondStepProps {
    errors: any;
    register: any;
};

const SecondStep: React.FC<SecondStepProps> = ({ errors, register }) => {
    const [indexes, setIndexes] = React.useState<any[]>([]);
    const [counter, setCounter] = React.useState<number>(0);

    const addColor = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    }

    const removeColor = (index: any) => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };

    const clearColors = () => {
        setIndexes([]);
    };

    return (
        <div className="mb-3">
            {indexes.map(index => {
                const fieldName = `color[${index}]`;
                return (
                    <fieldset name={fieldName} key={fieldName}>
                        <div className="mb-3">
                            <LabelContainer className="text-warning">Color {index+1}</LabelContainer>
                            <InputContainer>
                                {/* {NameIcon && <IconContainer><img src={NameIcon} width="24px" height="24px" alt="user-icon" /></IconContainer>} */}
                                <input {...register(`properties[${index}].color`, { required: false })} type="text" name={`properties[${index}].color`} id="properties.color" className="form-control" />
                            </InputContainer>
                            <LabelContainer style={{textDecoration:'underline'}}>Amount Of</LabelContainer>
                            <div className="d-flex">
                                   <div>
                                    <LabelContainer className="text-warning">XS</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].amount.XS`, { required: false })} type="number" min="0" name={`properties[${index}].amount.XS`} id={`properties[${index}].amount.XS`} className="form-control" />
                                    </InputContainer>
                                   </div>
                                <div>
                                    <LabelContainer className="text-warning">S</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].amount.S`, { required: false })} type="number" min="0" name={`properties[${index}].amount.S`} id={`properties[${index}].amount.S`} className="form-control" />
                                    </InputContainer>
                                </div>
                                <div>
                                    <LabelContainer className="text-warning">M</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].amount.M`, { required: false })} type="number" min="0" name={`properties[${index}].amount.M`} id={`properties[${index}].amount.M`} className="form-control" />
                                    </InputContainer>
                                </div>
                                <div>
                                    <LabelContainer className="text-warning">L</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].amount.L`, { required: false })} type="number" min="0" name={`properties[${index}].amount.L`} id={`properties[${index}].amount.L`} className="form-control" />
                                    </InputContainer>
                                </div>
                                <div>
                                    <LabelContainer className="text-warning">XL</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].amount.XL`, { required: false })} type="number" min="0" name={`properties[${index}].amount.XL`} id={`properties[${index}].amount.XL`} className="form-control" />
                                    </InputContainer>
                                </div>
                                <div>
                                    <LabelContainer className="text-warning">XXL</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].amount.XXL`, { required: false })} type="number" min="0" name={`properties[${index}].amount.XXL`} id={`properties[${index}].amount.XXL`} className="form-control" />
                                    </InputContainer>
                                </div>
                                <div>
                                    <LabelContainer className="text-warning">XXXL</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].amount.XXXL`, { required: false })} type="number" min="0" name={`properties[${index}].amount.XXXL`} id={`properties[${index}].amount.XXXL`} className="form-control" />
                                    </InputContainer>
                                </div>
                            </div>
                        </div>
                        <button type="button" className="btn btn-danger" onClick={removeColor(index)}>
                            Remove
                        </button>
                    </fieldset>
                )
            })}
            <button type="button" className="btn btn-warning" onClick={addColor}>
                Add Color
            </button>
            <button type="button" className="btn btn-secondary" onClick={clearColors}>
                Clear Colors
            </button>
        </div>
    )
}

export default SecondStep