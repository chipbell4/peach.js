import Sprite from './sprite.js';
type PaletteEntry = [number, number, number];
type PaletteArray = PaletteEntry[];
export default class Peach {
    palette: PaletteArray;
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    context: CanvasRenderingContext2D;
    imageData: ImageData;
    sprites: Sprite[];
    constructor(width: number, height: number, palette: number[]);
    /**
     * Set a pixel in the canvas
     * @param i X coordinate
     * @param j Y coordinate
     * @param paletteIndex Index into the palette
     */
    setPixel(i: number, j: number, paletteIndex: number): void;
    /**
     * Render all sprites to the canvas
     */
    render(): void;
    static Sprite: typeof Sprite;
}
export {};
