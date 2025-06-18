import React from 'react';
import { createRoot } from 'react-dom/client';

import Palette from './palette';
import Sprite from './sprite';

const App = () => {
    const [colors, setColors] = React.useState(["#ff0000", "#00ff00", "#0000ff"]);
    const [workingColor, setWorkingColor] = React.useState(colors[0]);

    return (
        <div>
            <h1>Sprite Editor</h1>
            <Palette startingColors={colors} onColorChange={setColors} onSelectColor={(c) => setWorkingColor(c)}/>
            <Sprite width={16} height={16} color={workingColor} palette={colors}/>
        </div>
    );
};

const root = createRoot(document.body);
root.render(<App />);