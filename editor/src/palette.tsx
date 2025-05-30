import React from 'react';

const Palette = ({ startingColors = ["#ff0000"] }) => {

    const [colors, setColors] = React.useState(startingColors);

    const pickers = colors.map((color, index) => {
        const onChange = (event) => {
            colors[index] = event.target.value;
            setColors([...colors]);
        };

        const removeColor = () => {
            const newColors = colors.filter((_, i) => i !== index);
            setColors(newColors);
        };

        return (
            <div class="color-picker-container" key={index}>
                <label>
                    <input type="color" value={color} onChange={onChange} style={{ width: '100%' }} />
                    <span class="color-picker-text">Color {index + 1} { color }</span>
                </label>
                <button class="remove" onClick={removeColor}>&times;</button>
            </div>
        );
    });

    const addColor = () => {
        setColors([...colors, "#000000"]);
    };

    return (
        <div class="palette">
            <h2>Palette</h2>
            <button class="add" onClick={addColor}>Add Color</button>
            <div class="color-pickers">
                { pickers }
            </div>
        </div>
    );
}

export default Palette;