import React from 'react';

const Sprite = ({ width = 16, height = 16, color = null, palette = ["#f00"] }) => {
    const [mouseDown, setMouseDown] = React.useState(false);
    const [sprite, setSprite] = React.useState(Array.from({ length: height }, () => Array(width).fill(null)));

    const fill = (row, col) => {
        const newSprite = sprite.map((r, i) => r.map((c, j) => (i === row && j === col ? color : c)));
        setSprite(newSprite);
    };

    const renderCell = (row, col) => {
        const cellStyle: Record<string, string> = {
            width: "10px",
            height: "10px",
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
                style={ cellStyle }
                onClick={() => fill(row, col)}
                onMouseDown={() => fill(row, col)}
                onMouseEnter={() => mouseDown && fill(row, col)}
            />
        );
    };

    const rows = Array.from({ length: height }, (_, rowIndex) => (
        <tr key={rowIndex}>
            {sprite[rowIndex].map((_, colIndex) => renderCell(rowIndex, colIndex))}
        </tr>
    ));

    return (
        <div className="sprite-editor">
            <h2>Sprite Editor</h2>
            <table className="sprite-grid" cellspacing="0" onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)}>
                { rows }
            </table>
        </div>
    );
}

export default Sprite;