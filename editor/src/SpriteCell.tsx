import React from 'react';

type Bitmap = (number | null)[][];

interface SpriteCellProps {
    row: number;
    col: number;
    sprite: Bitmap;
    palette: string[];
    mouseDown: boolean;
    onFill: (row: number, col: number) => void;
}

const SpriteCell = ({ row, col, sprite, palette, mouseDown, onFill }: SpriteCellProps) => {
    const cellStyle: Record<string, string> = {
        width: "15px",
        height: "15px",
        border: "1px solid #000",
        cursor: "pointer",
    }

    if (sprite[row][col] !== null) {
        cellStyle.backgroundColor = palette[sprite[row][col]];
    }

    return (
        <td
            key={`${row}-${col}`}
            className="sprite-cell"
            style={cellStyle}
            onClick={() => onFill(row, col)}
            onMouseDown={() => onFill(row, col)}
            onMouseEnter={() => mouseDown && onFill(row, col)}
        />
    );
};

export default SpriteCell;
