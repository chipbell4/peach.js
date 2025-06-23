import React from 'react';

const Code = ({ sprite }) => {
    return (
        <div className="code-container">
            <pre className="rendered-code">
                { JSON.stringify(sprite) }
            </pre>
        </div>
    )
};

export default Code;