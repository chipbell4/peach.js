import React from 'react';

import { DimensionInput } from './dimension';
import ImageIdDisplay from './ImageIdDisplay';
import SpriteGrid from './SpriteGrid';
import SavedSprites from './SavedSprites';
import { useImageHash } from '../hooks/useImageHash';
import { useResizableSprite } from '../hooks/useResizableSprite';
import useSpriteStorage from '../hooks/useSpriteStorage';

type Bitmap = (number | null)[][];

interface SpriteEditorProps {
    sprite: Bitmap;
    onSpriteChange: (s: Bitmap) => void;
    color: number | null;
    palette: string[];
    onLoadSprite?: (sprite: Bitmap) => void;
}

const SpriteEditor = ({ sprite = [[null]], onSpriteChange = (s) => {}, color = null, palette = ["#f00"], onLoadSprite }: SpriteEditorProps) => {
    const [currentSprite, fill, onDimensionsChange] = useResizableSprite(sprite, onSpriteChange);
    const [saveCount, setSaveCount] = React.useState(0);
    const imageId = useImageHash(currentSprite);
    const { saveSprite } = useSpriteStorage();

    const handleSaveSprite = () => {
        saveSprite(imageId, currentSprite);
        setSaveCount(saveCount + 1);
    };

    const handleLoadSpriteFromStorage = (_imageId: string, loadedSprite: Bitmap) => {
        if (onLoadSprite) {
            onLoadSprite(loadedSprite);
        }
    };

    return (
        <div className="sprite-editor">
            <DimensionInput initialWidth={sprite[0].length} initialHeight={sprite.length} onChange={onDimensionsChange} />
            <ImageIdDisplay sprite={currentSprite} />
            <button onClick={handleSaveSprite}>Save Sprite</button>
            <SpriteGrid sprite={currentSprite} palette={palette} onCellFill={(row, col) => fill(row, col, color)} />
            <SavedSprites onLoadSprite={handleLoadSpriteFromStorage} refreshTrigger={saveCount} />
        </div>
    );
}

export default SpriteEditor;