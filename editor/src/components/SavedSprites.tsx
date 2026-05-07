import React from 'react';
import useSpriteStorage from '../hooks/useSpriteStorage';

type Bitmap = (number | null)[][];

interface SavedSpritesProps {
    onLoadSprite: (imageId: string, sprite: Bitmap) => void;
    refreshTrigger?: number;
}

const SavedSprites = ({ onLoadSprite, refreshTrigger }: SavedSpritesProps) => {
    const { getSavedSpriteIds, loadSprite, deleteSprite } = useSpriteStorage();
    const [spriteIds, setSpriteIds] = React.useState<string[]>([]);

    React.useEffect(() => {
        const ids = getSavedSpriteIds();
        setSpriteIds(ids);
    }, [refreshTrigger]);

    const handleLoadSprite = (imageId: string) => {
        const sprite = loadSprite(imageId);
        if (sprite) {
            onLoadSprite(imageId, sprite);
        }
    };

    const handleDeleteSprite = (imageId: string) => {
        deleteSprite(imageId);
        setSpriteIds(spriteIds.filter(id => id !== imageId));
    };

    if (spriteIds.length === 0) {
        return <div className="saved-sprites"><p>No saved sprites</p></div>;
    }

    return (
        <div className="saved-sprites">
            <h2>Saved Sprites</h2>
            <ul>
                {spriteIds.map(imageId => (
                    <li key={imageId}>
                        <button onClick={() => handleLoadSprite(imageId)} className="image-id-link">
                            {imageId}
                        </button>
                        <button 
                            onClick={() => handleDeleteSprite(imageId)} 
                            className="delete-button"
                            title="Delete sprite"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SavedSprites;
