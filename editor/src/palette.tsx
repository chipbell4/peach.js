import React from 'react';

interface PaletteProps {
    startingColors: string[];
    onPaletteChange: (colors: string[]) => void;
    onSelectColor: (color: number | null) => void;
}

type Handler = React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;

export const Palette = ({ startingColors = ["#ff0000"], onPaletteChange: onColorChange = function(colors) {}, onSelectColor = function(color) {} }: PaletteProps) => {
    const [colors, setColors] = React.useState(startingColors);
    const [selectedColor, setSelectedColor] = React.useState<number | null>(null);

    const pickers = colors.map((color, index) => {
        const onSelect = () => {
            setSelectedColor(index);
            onSelectColor(index);
        }

        const onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement> = (event) => {
            colors[index] = event.target.value;
            setColors([...colors]);
            onColorChange([...colors]);
            setSelectedColor(index);
        };

        const removeColor = () => {
            const newColors = colors.filter((_, i) => i !== index);
            setColors(newColors);
            onColorChange(newColors);
        };

        let className = "color-picker-container";
        if (selectedColor !== null && color === colors[selectedColor]) {
            className += " selected";
        }

        return (
            <div className={className} key={index}>
                <input type="color" value={color} onChange={onChange} style={{ width: '100%' }} />
                <span className="color-picker-text" onClick={onSelect}>Color {index + 1} { color }</span>
                <button className="remove" onClick={removeColor}>&times;</button>
            </div>
        );
    });

    const addColor = () => {
        const newColors = [...colors, "#000000"];
        setColors(newColors);
        onColorChange(newColors);
    };

    const onSelectErase = () => {
        setSelectedColor(null);
        onSelectColor(null);
    }

    const eraseContainerClass = selectedColor === null ? "color-picker-container selected" : "color-picker-container";

    return (
        <div className="palette">
            <h2>Palette</h2>
            <button className="add" onClick={addColor}>Add Color</button>
            <div className="color-pickers">
                <div className={eraseContainerClass} onClick={onSelectErase}>
                    <label>Erase</label>
                </div>
                { pickers }
            </div>
        </div>
    );
}

interface PreviewProps {
    colors: string[];
}
const Preview = (props: PreviewProps) => {
    const squares = props.colors.map((c, i) => {
        const style = {
            backgroundColor: c;
        }
        return (
            <span key={i} style={style}>
                &nbsp;
            </span>
        );
    });

    return (
        <>
        { squares }
        </>
    );
}