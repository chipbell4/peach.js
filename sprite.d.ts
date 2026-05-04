/**
 * Sprite class for managing bitmap-based sprites with palette assignment
 */
export declare class Sprite {
    bitmap: number[][];
    paletteAssignment: number[];
    x: number;
    y: number;
    constructor(bitmap: number[][], paletteAssignment: number[]);
    get width(): number;
    get height(): number;
    /**
     * Check if this sprite collides with another sprite
     * @param s The sprite to check collision with
     * @returns true if sprites collide, false otherwise
     */
    collides(s: Sprite): boolean;
}
