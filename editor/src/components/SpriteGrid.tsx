import React, { useState } from 'react';
import SpriteCell from './SpriteCell';

type Bitmap = (number | null)[][];

interface SpriteGridProps {
    sprite: Bitmap;
    palette: string[];
    onCellFill: (row: number, col: number) => void;
}

const SpriteGrid = ({ sprite, palette, onCellFill }: SpriteGridProps) => {
    const [mouseDown, setMouseDown] = useState(false);

    const rows = Array.from({ length: sprite.length }, (_, rowIndex) => (
        <tr key={rowIndex}>
            {sprite[rowIndex].map((_, colIndex) => (
                <SpriteCell
                    key={`${rowIndex}-${colIndex}`}
                    row={rowIndex}
                    col={colIndex}
                    sprite={sprite}
                    palette={palette}
                    mouseDown={mouseDown}
                    onFill={onCellFill}
                />
            ))}
        </tr>
    ));

    return (
        <table
            className="sprite-grid"
            cellSpacing="0"
            onMouseDown={() => setMouseDown(true)}
            onMouseUp={() => setMouseDown(false)}
        >
            <tbody>{rows}</tbody>
        </table>
    );
};

export default SpriteGrid;
