import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';
import { INewImagesDesign } from './thirdDesignCanvas';

interface ThirdDesignCanvasFrontImageProps {
    item?: Partial<INewImagesDesign>;
};

const ThirdDesignCanvasFrontImage: React.FC<ThirdDesignCanvasFrontImageProps> = ({ item }) => {
    const [img] = useImage(item?.image);
    return (
        <>
            <Image
                image={img}
                x={item?.x}
                y={item?.y}
                width={item?.width}
                height={item?.height}
                rotation={item?.rotation}
            />
        </>
    )
}

export default ThirdDesignCanvasFrontImage