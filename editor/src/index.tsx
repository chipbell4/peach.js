import React from 'react';
import { createRoot } from 'react-dom/client';

import Palette from './palette';
import SpriteEditor from './sprite-editor';
import Code from './code';

const App = () => {
    const [colors, setColors] = React.useState(["#ff0000", "#00ff00", "#0000ff"]);
    const [workingColorIndex, setWorkingColorIndex] = React.useState<number | null>(null);

    const onSelectColor = (index: number | null) => {
        setWorkingColorIndex(index);
    }

    const height = 16;
    const width = 16;
    const [sprite, setSprite] = React.useState(Array.from({ length: height }, () => Array(width).fill(null)));

    return (
        <>
            <h1>Sprite Editor</h1>
            <div className="flex-container">
                <Palette startingColors={colors} onColorChange={setColors} onSelectColor={onSelectColor}/>
                <div className="editor-column">
                    <SpriteEditor sprite={sprite} onSpriteChange={setSprite} color={workingColorIndex} palette={colors}/>
                    <Code sprite={sprite} />
                </div>
            </div>
        </>
    );
};

const root = createRoot(document.body);
root.render(<App />);