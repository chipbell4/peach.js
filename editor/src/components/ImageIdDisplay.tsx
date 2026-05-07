import React from 'react';
import { useImageHash } from '../hooks/useImageHash';

type Bitmap = (number | null)[][];

interface ImageIdDisplayProps {
    sprite: Bitmap;
}

const ImageIdDisplay = ({ sprite }: ImageIdDisplayProps) => {
    const imageId = useImageHash(sprite);
    return <div>Image Id: {imageId}</div>;
};

export default ImageIdDisplay;
