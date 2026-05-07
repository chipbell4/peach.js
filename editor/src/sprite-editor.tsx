import React from 'react';

import { DimensionInput } from './dimension';
import ImageIdDisplay, { useImageHash } from './ImageIdDisplay';
import SpriteGrid from './SpriteGrid';
import useSpriteStorage from './useSpriteStorage';

type Bitmap = (number | null)[][];

interface SpriteEditorProps {
    sprite: Bitmap;
    onSpriteChange: (s: Bitmap) => void;
    color: number | null;
    palette: string[];
}

const useResizableSprite = (initialSprite: Bitmap, onSpriteChange: (s: Bitmap) => void) => {
    const [currentSprite, setSprite] = React.useState(initialSprite);

    const fill = (row: number, col: number, color: number | null) => {
        const newSprite = currentSprite.map((r, i) => r.map((c, j) => (i === row && j === col ? color : c)));
        setSprite(newSprite);
        onSpriteChange(newSprite);
    };

    const onDimensionsChange = (w: number, h: number) => {
        const oldWidth = currentSprite[0].length;
        const oldHeight = currentSprite.length;

        const newSprite = currentSprite.map(r => {
            return r.map(v => v);
        });

        // If the new width is smaller, trim off the end
        if (oldWidth > w) {
            for (const row of newSprite) {
                while(row.length > w) {
                    row.pop();
                }
            }
        }
        // If the new width is bigger, add a null on the end
        if (oldWidth < w) {
            for (const row of newSprite) {
                row.push(null);
            }
        }

        // if the new height is smaller, drop records off the end
        if (oldHeight > h) {
            while (newSprite.length > h) {
                newSprite.pop();
            }
        }

        // if the new height is greater, add a new row
        if (oldHeight < h) {
            while (newSprite.length < h) {
                newSprite.push(Array(w).fill(null));
            }
        }

        setSprite(newSprite);
    };

    return [currentSprite, fill, onDimensionsChange] as const;
};

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