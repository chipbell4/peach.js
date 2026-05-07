import React from 'react';

import { DimensionInput } from './dimension';
import ImageIdDisplay from './ImageIdDisplay';
import SpriteGrid from './SpriteGrid';
import { useImageHash } from '../hooks/useImageHash';
import { useResizableSprite } from '../hooks/useResizableSprite';
import useSpriteStorage from '../hooks/useSpriteStorage';

type Bitmap = (number | null)[][];

interface SpriteEditorProps {
    sprite: Bitmap;
    onSpriteChange: (s: Bitmap) => void;
    color: number | null;
    palette: string[];
}

const SpriteEditor = ({ sprite = [[null]], onSpriteChange = (s) => {}, color = null, palette = ["#f00"] }: SpriteEditorProps) => {
    const [currentSprite, fill, onDimensionsChange] = useResizableSprite(sprite, onSpriteChange);
    const imageId = useImageHash(currentSprite);
    const { saveSprite } = useSpriteStorage();

    const handleSaveSprite = () => {
        saveSprite(imageId, currentSprite);
    };

    return (
        <div className="sprite-editor">
            <DimensionInput initialWidth={sprite[0].length} initialHeight={sprite.length} onChange={onDimensionsChange} />
            <ImageIdDisplay sprite={currentSprite} />
            <button onClick={handleSaveSprite}>Save Sprite</button>
            <SpriteGrid sprite={currentSprite} palette={palette} onCellFill={(row, col) => fill(row, col, color)} />
        </div>
    );
}

export default SpriteEditor;