import React from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
    return (
        <div>
        <h1>Welcome to the Editor</h1>
        <p>This is a placeholder for the editor component.</p>
        </div>
    );
};

const root = createRoot(document.body);
root.render(<App />);