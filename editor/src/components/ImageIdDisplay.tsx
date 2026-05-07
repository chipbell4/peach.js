import React from 'react';

interface ImageIdDisplayProps {
    spriteName: string;
    onSpriteNameChange: (name: string) => void;
}

const ImageIdDisplay = ({ spriteName, onSpriteNameChange }: ImageIdDisplayProps) => {
    return (
        <div className="image-id-display">
            <label htmlFor="sprite-name">Sprite Name:</label>
            <input
                id="sprite-name"
                type="text"
                value={spriteName}
                onChange={(e) => onSpriteNameChange(e.target.value)}
                placeholder="Enter sprite name"
            />
        </div>
    );
};

export default ImageIdDisplay;
