import React from 'react';
import { createRoot } from 'react-dom/client';

import { Palette } from './components/palette';
import SpriteEditor from './components/sprite-editor';
import Code from './components/code';

const App = () => {
    const [colors, setColors] = React.useState(["#ff0000", "#00ff00", "#0000ff"]);
    const [workingColorIndex, setWorkingColorIndex] = React.useState<number | null>(null);

    const onSelectColor = (index: number | null) => {
        setWorkingColorIndex(index);
    }

    const height = 16;
    const width = 16;
    const [sprite, setSprite] = React.useState(Array.from({ length: height }, () => Array(width).fill(null)));

    const handleLoadSprite = (loadedSprite: (number | null)[][]) => {
        setSprite(loadedSprite);
    };

    return (
        <>
            <h1>Sprite Editor</h1>
            <Palette startingColors={colors} onPaletteChange={setColors} onSelectColor={onSelectColor}/>
            <div className="editor-column">
                <SpriteEditor sprite={sprite} onSpriteChange={setSprite} color={workingColorIndex} palette={colors} onLoadSprite={handleLoadSprite}/>
                <Code sprite={sprite} />
            </div>
        </>
    );
};

const root = createRoot(document.body);
root.render(<App />);