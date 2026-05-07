import React from 'react';

type Bitmap = (number | null)[][];

const STORAGE_KEY = 'saved_sprites';

const useSpriteStorage = () => {
    const saveSprite = (imageId: string, sprite: Bitmap) => {
        const stored = localStorage.getItem(STORAGE_KEY);
        const sprites = stored ? JSON.parse(stored) : {};
        sprites[imageId] = sprite;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sprites));
    };

    const loadSprite = (imageId: string): Bitmap | null => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return null;
        const sprites = JSON.parse(stored);
        return sprites[imageId] || null;
    };

    const getSavedSpriteIds = (): string[] => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return [];
        return Object.keys(JSON.parse(stored));
    };

    const deleteSprite = (imageId: string) => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return;
        const sprites = JSON.parse(stored);
        delete sprites[imageId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sprites));
    };

    return { saveSprite, loadSprite, getSavedSpriteIds, deleteSprite };
};

export default useSpriteStorage;
