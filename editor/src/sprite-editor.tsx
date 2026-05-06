import React from 'react';

import { DimensionInput } from './dimension';

const SpriteEditor = ({ sprite = [[null]], onSpriteChange = (s) => {}, color = null, palette = ["#f00"] }) => {
    const [mouseDown, setMouseDown] = React.useState(false);
    const [currentSprite, setSprite] = React.useState(sprite);

    const fill = (row: number, col: number) => {
        const newSprite = currentSprite.map((r, i) => r.map((c, j) => (i === row && j === col ? color : c)));
        setSprite(newSprite);
        onSpriteChange(newSprite);
    };

    const renderCell = (row: number, col: number) => {
        const cellStyle: Record<string, string> = {
            width: "10px",
            height: "10px",
            border: "1px solid #000",
            cursor: "pointer",
        }

        if (currentSprite[row][col] !== null) {
            cellStyle.backgroundColor = palette[currentSprite[row][col]];
        }

        return (
            <td
                key={`${row}-${col}`}
                className="sprite-cell"
                style={ cellStyle }
                onClick={() => fill(row, col)}
                onMouseDown={() => fill(row, col)}
                onMouseEnter={() => mouseDown && fill(row, col)}
            />
        );
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

    const rows = Array.from({ length: currentSprite.length }, (_, rowIndex) => (
        <tr key={rowIndex}>
            {currentSprite[rowIndex].map((_, colIndex) => renderCell(rowIndex, colIndex))}
        </tr>
    ));

    return (
        <div className="sprite-editor">
            <DimensionInput initialWidth={sprite[0].length} initialHeight={sprite.length} onChange={onDimensionsChange} />
            <table className="sprite-grid" cellSpacing="0" onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)}>
                <tbody>
                    { rows }
                </tbody>
            </table>
        </div>
    );
}

export default SpriteEditor;