import React from 'react';

import { DimensionInput } from './dimension';
import ImageIdDisplay from './ImageIdDisplay';
import SpriteGrid from './SpriteGrid';
import SavedSprites from './SavedSprites';
import { useResizableSprite } from '../hooks/useResizableSprite';
import useSpriteStorage from '../hooks/useSpriteStorage';
import Code from './code';

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
    const [spriteName, setSpriteName] = React.useState('');
    const [saveCount, setSaveCount] = React.useState(0);
    const { saveSprite } = useSpriteStorage();

    const handleSaveSprite = () => {
        if (spriteName.trim()) {
            saveSprite(spriteName, currentSprite);
            setSaveCount(saveCount + 1);
        }
    };

    const handleLoadSpriteFromStorage = (imageId: string, loadedSprite: Bitmap) => {
        setSpriteName(imageId);
        if (onLoadSprite) {
            onLoadSprite(loadedSprite);
        }
    };

    return (
        <div className="sprite-editor">
            <DimensionInput initialWidth={currentSprite[0].length} initialHeight={currentSprite.length} onChange={onDimensionsChange} />
            <ImageIdDisplay spriteName={spriteName} onSpriteNameChange={setSpriteName} />
            <SpriteGrid sprite={currentSprite} palette={palette} onCellFill={(row, col) => fill(row, col, color)} />
            <button className="save-sprite-button" onClick={handleSaveSprite} disabled={!spriteName.trim()}>Save Sprite</button>
            <Code sprite={currentSprite} />
            <SavedSprites onLoadSprite={handleLoadSpriteFromStorage} refreshTrigger={saveCount} />
        </div>
    );
}

export default SpriteEditor;