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
            <div key={index}>
                <label>
                    <input type="color" value={color} onChange={onChange} style={{ width: '100%' }} />
                    { color }
                </label>
                <button onClick={removeColor}>&times;</button>
            </div>
        );
    });

    const addColor = () => {
        setColors([...colors, "#000000"]);
    };

    return (
        <div>
            <h1>Palette</h1>
            <button onClick={addColor}>Add Color</button>
            { pickers }
        </div>
    );
}

export default Palette;