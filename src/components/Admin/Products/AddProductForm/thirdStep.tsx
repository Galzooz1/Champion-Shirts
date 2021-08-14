import React from 'react';
import { InputContainer, LabelContainer } from '../../../Client/LoginModal/InputWithIcon';

interface ThirdStepProps {
    errors: any;
    register: any;
};

const ThirdStep: React.FC<ThirdStepProps> = ({ errors, register }) => {
    const [indexes, setIndexes] = React.useState<any[]>([]);
    const [counter, setCounter] = React.useState<number>(0);
    const [disable, setDisable] = React.useState(false);
    // let btnRef = useRef<HTMLButtonElement>();

    const addDirection = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
        // btnRef.disabled=true;
    }

    const removeDirection = (index: any) => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
        setDisable(false)
        // btnRef.disabled=false;
    };

    return (
        <div className="mb-3">
            {indexes.map(index => {
                const fieldName = `properties[${index}]`;
                return (
                    <fieldset name={fieldName} key={fieldName}>
                        <div className="mb-3">
                            <div>
                                <LabelContainer className="text-warning">Front</LabelContainer>
                                <InputContainer>
                                    <input {...register(`properties[${index}].frontImg`, { required: false })} type="text" name={`properties[${index}].direction`} id={`properties[${index}].direction`} className="form-control" />
                                </InputContainer>
                            </div>
                            <LabelContainer style={{ textDecoration: 'underline' }}>Size Of Canvas</LabelContainer>
                            <div className="d-flex">
                                <div>
                                    <LabelContainer className="text-warning">Width</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].sizeOfCanvasFront.width`, { required: false })} type="number" min="0" name={`properties[${index}].sizeOfCanvas.width`} id={`properties[${index}].sizeOfCanvas.width`} className="form-control" />
                                    </InputContainer>
                                </div>
                                <div>
                                    <LabelContainer className="text-warning">Height</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].sizeOfCanvasFront.height`, { required: false })} type="number" min="0" name={`properties[${index}].sizeOfCanvas.height`} id={`properties[${index}].sizeOfCanvas.height`} className="form-control" />
                                    </InputContainer>
                                </div>
                            </div>
                                <LabelContainer style={{ textDecoration: 'underline' }}>Position Of Canvas</LabelContainer>
                            <div className="d-flex">
                                <div>
                                    <LabelContainer className="text-warning">X</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].positionOfCanvasFront.x`, { required: false })} type="number" min="0" name={`properties[${index}].positionOfCanvas.x`} id={`properties[${index}].positionOfCanvas.x`} className="form-control" />
                                    </InputContainer>
                                </div>
                                <div>
                                    <LabelContainer className="text-warning">Y</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].positionOfCanvasFront.y`, { required: false })} type="number" min="0" name={`properties[${index}].positionOfCanvas.y`} id={`properties[${index}].positionOfCanvas.y`} className="form-control" />
                                    </InputContainer>
                                </div>
                            </div>
                        </div>
                        <hr className="bg-light"/>
                        <div className="mb-3">
                            <div>
                                <LabelContainer className="text-warning">Back</LabelContainer>
                                <InputContainer>
                                    <input {...register(`properties[${index}].backImg`, { required: false })} type="text" name={`properties[${index}].direction`} id={`properties[${index}].direction`} className="form-control" />
                                </InputContainer>
                            </div>
                            <LabelContainer style={{ textDecoration: 'underline' }}>Size Of Canvas</LabelContainer>
                            <div className="d-flex">
                                <div>
                                    <LabelContainer className="text-warning">Width</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].sizeOfCanvasBack.width`, { required: false })} type="number" min="0" name={`properties[${index}].sizeOfCanvas.width`} id={`properties[${index}].sizeOfCanvas.width`} className="form-control" />
                                    </InputContainer>
                                </div>
                                <div>
                                    <LabelContainer className="text-warning">Height</LabelContainer>
                                    <InputContainer>
                                        <input {...register(`properties[${index}].sizeOfCanvasBack.height`, { required: false })} type="number" min="0" name={`properties[${index}].sizeOfCanvas.height`} id={`properties[${index}].sizeOfCanvas.height`} className="form-control" />
                                    </InputContainer>
                                </div>
                            </div>

                                <LabelContainer style={{ textDecoration: 'underline' }}>Position Of Canvas</LabelContainer>
                                <div className="d-flex">
                                    <div>
                                        <LabelContainer className="text-warning">X</LabelContainer>
                                        <InputContainer>
                                            <input {...register(`properties[${index}].positionOfCanvasBack.x`, { required: false })} type="number" min="0" name={`properties[${index}].positionOfCanvas.x`} id={`properties[${index}].positionOfCanvas.x`} className="form-control" />
                                        </InputContainer>
                                    </div>
                                    <div>
                                        <LabelContainer className="text-warning">Y</LabelContainer>
                                        <InputContainer>
                                            <input {...register(`properties[${index}].positionOfCanvasBack.y`, { required: false })} type="number" min="0" name={`properties[${index}].positionOfCanvas.y`} id={`properties[${index}].positionOfCanvas.y`} className="form-control" />
                                        </InputContainer>
                                    </div>
                                </div>
                        </div>
                        <button type="button" className="btn btn-danger" onClick={removeDirection(index)}>
                            Remove
                        </button>
                    </fieldset>
                )
            })}
            <button disabled={disable} type="button" className="btn btn-warning" onClick={() => {addDirection(); setDisable(true)}}>
                Add Directions
            </button>
        </div>
    )
}

export default ThirdStep