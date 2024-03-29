import Konva from 'konva';
import React from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import TrashPng from '../../../assets/trash.png';

interface SecondStepImageProps {
    designProps: any;
    isSelected: any;
    onSelect: () => void;
    onChange: (newAttrs: any) => void;
    SetStatesValues: (_width: any, _height: any, _x: any, _y: any, _rotation: any) => void;
    setValue?:any;
    key?:any;
    setIsDesignValue:() => void;
    unRegister:() => void;
    premuimExtraPriceFunc:() => void;
};

const SecondStepImage: React.FC<SecondStepImageProps> = ({ premuimExtraPriceFunc,unRegister ,setIsDesignValue ,key ,setValue ,SetStatesValues ,designProps, isSelected, onSelect, onChange }, props) => {
    let designRef = React.useRef<any>();
    let trRef = React.useRef<any>();
    let deleteRef = React.useRef<any>();
    let [isDesignShown, setIsDesignShown] = React.useState(true);
    let [premiumClicks, setPremiumClicks] = React.useState<number>(0);

    React.useEffect(() => {
        // setValue(`shirtDesigns.front[${props.key}].design.is_design`, true);
        if (isSelected) {
            trRef.current.nodes([designRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);
    
    React.useEffect(() => {
        setIsDesignValue();
    }, [])

    const [img] = useImage(designProps.image);
    const [deleteImg] = useImage(TrashPng);

    const handleCursor = (e: any) => {
        const container: any = e.target.getStage()?.container();
        container!.style.cursor = "default";
        setIsDesignShown(false)
        // setPremiumClicks(++premiumClicks);
        unRegister()
        premuimExtraPriceFunc()
    }

    const setValues = (e: any) => { 
        SetStatesValues(e.target.width(), e.target.height(), e.target.x(), e.target.y(), e.target.rotation())
    }

    return (
        <>
            {isDesignShown &&
                <>
                    <Image
                        key={key}
                        ref={designRef}
                        image={img}
                        x={designProps.x}
                        y={designProps.y}
                        width={designProps.width}
                        height={designProps.height}
                        draggable={true}
                        onClick={onSelect}
                        onTap={onSelect}
                        onDragEnd={(e) => {
                            onChange({
                                ...designProps,
                                x: e.target.x(),
                                y: e.target.y(),
                            })
                            setValues(e);
                        }}
                        onTransformEnd={(e) => {
                            const node = designRef.current;
                            const scaleX = node.scaleX();
                            const scaleY = node.scaleY();
                            node.scaleX(1);
                            node.scaleY(1);
                            onChange({
                                ...designProps,
                                x: node.x(),
                                y: node.y(),
                                // set minimal value
                                width: Math.max(5, node.width() * scaleX),
                                height: Math.max(node.height() * scaleY),
                            });
                            setValues(e);
                        }}
                    />
                    {isSelected && (
                        <Transformer
                            ref={trRef}
                            boundBoxFunc={(oldBox, newBox) => {
                                // limit resize
                                if (newBox.width < 5 || newBox.height < 5) {
                                    return oldBox;
                                }
                                return newBox;
                            }}
                        >
                            <Image image={deleteImg} onMouseEnter={e => {
                                const container: any = e.target.getStage()?.container();
                                container!.style.cursor = "pointer";
                                const shape = e.target;
                                shape.to({
                                    scaleX:(1.2),
                                    scaleY:(1.2),
                                    x:-2,
                                    opacity: 1,
                                    duration: 0.2
                                })
                            }}
                            onMouseLeave={e => {
                                const container: any = e.target.getStage()?.container();
                                container!.style.cursor = "default";
                                const shape = e.target;
                                shape.to({
                                    scaleX:(1),
                                    scaleY:(1),
                                    x:0,
                                    opacity: 0.6,
                                    duration: 0.2
                                })
                            }}
                            deleteRef={deleteRef} width={20} height={20} y={-28} onClick={handleCursor} opacity={0.6} />
                        </Transformer>
                    )}
                </>
            }
        </>
    )
}

export default SecondStepImage