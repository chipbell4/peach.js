import React from 'react';
import { createRoot } from 'react-dom/client';

import Palette from './palette';

const App = () => {
    return (
        <div>
        <h1>Welcome to the Editor</h1>
        <p>This is a placeholder for the editor component.</p>
        <p>
            <Palette startingColors={["#ff0000", "#00ff00", "#0000ff"]} />
        </p>
        </div>
    );
};

const root = createRoot(document.body);
root.render(<App />);