import React from 'react';

import { DimensionInput } from './dimension';
import ImageIdDisplay from './ImageIdDisplay';
import SpriteGrid from './SpriteGrid';

type Bitmap = (number | null)[][];

interface SpriteEditorProps {
    sprite: Bitmap;
    onSpriteChange: (s: Bitmap) => void;
    color: number | null;
    palette: string[];
}

const SpriteEditor = ({ sprite = [[null]], onSpriteChange = (s) => {}, color = null, palette = ["#f00"] }: SpriteEditorProps) => {
    const [currentSprite, setSprite] = React.useState(sprite);
    const [activeColor, setActiveColor] = React.useState(color);
    // TODO: do we need this?
    // silly nonsense to get React to re-render
    React.useEffect(() => {
        setActiveColor(color)
    }, [color]);

    const fill = (row: number, col: number) => {
        const newSprite = currentSprite.map((r, i) => r.map((c, j) => (i === row && j === col ? activeColor : c)));
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

    return (
        <div className="sprite-editor">
            <DimensionInput initialWidth={sprite[0].length} initialHeight={sprite.length} onChange={onDimensionsChange} />
            <ImageIdDisplay sprite={currentSprite} />
            <SpriteGrid sprite={currentSprite} palette={palette} onCellFill={fill} />
        </div>
    );
}

export default SpriteEditor;