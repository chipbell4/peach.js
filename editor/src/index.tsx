import React from 'react';
import { createRoot } from 'react-dom/client';

import Palette from './palette';

const App = () => {
    return (
        <h1>Sprite Editor</h1>
        <Palette startingColors={["#ff0000", "#00ff00", "#0000ff"]} />
    );
};

const root = createRoot(document.body);
root.render(<App />);