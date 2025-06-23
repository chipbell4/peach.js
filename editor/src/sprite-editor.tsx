import React from 'react';

const SpriteEditor = ({ sprite = [[null]], onSpriteChange = (s) => {}, color = null, palette = ["#f00"] }) => {
    const [mouseDown, setMouseDown] = React.useState(false);
    const [currentSprite, setSprite] = React.useState(sprite);

    const fill = (row, col) => {
        const newSprite = currentSprite.map((r, i) => r.map((c, j) => (i === row && j === col ? color : c)));
        setSprite(newSprite);
        onSpriteChange(newSprite);
    };

    const renderCell = (row, col) => {
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

    const rows = Array.from({ length: currentSprite.length }, (_, rowIndex) => (
        <tr key={rowIndex}>
            {currentSprite[rowIndex].map((_, colIndex) => renderCell(rowIndex, colIndex))}
        </tr>
    ));

    return (
        <div className="sprite-editor">
            <h2>Sprite Editor</h2>
            <table className="sprite-grid" cellSpacing="0" onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)}>
                <tbody>
                    { rows }
                </tbody>
            </table>
        </div>
    );
}

export default SpriteEditor;