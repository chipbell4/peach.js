import React from 'react';
import { createRoot } from 'react-dom/client';

import Palette from './palette';
import SpriteEditor from './sprite-editor';
import Code from './code';

const App = () => {
    const [colors, setColors] = React.useState(["#ff0000", "#00ff00", "#0000ff"]);
    const [workingColor, setWorkingColor] = React.useState(colors[0]);

    const height = 16;
    const width = 16;
    const [sprite, setSprite] = React.useState(Array.from({ length: height }, () => Array(width).fill(null)));

    return (
        <div className="flex-container">
            <h1>Sprite Editor</h1>
            <Palette startingColors={colors} onColorChange={setColors} onSelectColor={(c) => setWorkingColor(c)}/>
            <div className="flex-container">
                <SpriteEditor sprite={sprite} onSpriteChange={setSprite} color={workingColor} palette={colors}/>
                <Code sprite={sprite} />
            </div>
        </div>
    );
};

const root = createRoot(document.body);
root.render(<App />);