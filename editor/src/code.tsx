import React from 'react';

interface CodeProps {
    sprite: (number | null)[][];
}

const Code = ({ sprite }: CodeProps) => {
    return (
        <div className="code-container">
            <pre className="rendered-code">
                { JSON.stringify(sprite) }
            </pre>
        </div>
    )
};

export default Code;