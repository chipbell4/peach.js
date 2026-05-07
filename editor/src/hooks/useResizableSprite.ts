import React, { useState } from 'react';

type Bitmap = (number | null)[][];

const useResizableSprite = (initialSprite: Bitmap, onSpriteChange: (s: Bitmap) => void) => {
    const [currentSprite, setSprite] = React.useState(initialSprite);

    React.useEffect(() => {
        setSprite(initialSprite);
    }, [initialSprite]);

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

export { useResizableSprite };
