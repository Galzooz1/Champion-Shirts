import React from 'react';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';

interface SecondStepImageProps {
    designProps:any;
    isSelected: any;
    onSelect: () => void;
    onChange: (newAttrs: any) => void;
};

const SecondStepImage: React.FC<SecondStepImageProps> = ({designProps, isSelected, onSelect, onChange}, props) => {
    let designRef = React.useRef<any>();
    let trRef = React.useRef<any>();
    React.useEffect(() => { 
        if(isSelected) {
            trRef.current.nodes([designRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    const [img] = useImage(designProps.image);

    return(
        <>
            <Image
                key={props.key}
                image={img}
                x={20}
                y={20}
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
                    console.log(e.target.x(), e.target.y(), e.target.width(), e.target.height(), e.target.rotation())
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
                />
            )}
        </>
    )
}

export default SecondStepImage