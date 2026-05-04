export declare class Sprite {
  bitmap: number[][];
  paletteAssignment: number[];
  x: number;
  y: number;

  constructor(bitmap: number[][], paletteAssignment: number[]);

  get width(): number;
  get height(): number;
  collides(s: Sprite): boolean;
}

type PaletteEntry = [number, number, number];
type PaletteArray = PaletteEntry[];

export declare class Peach {
  palette: PaletteArray;
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  context: CanvasRenderingContext2D;
  imageData: ImageData;
  sprites: Sprite[];

  constructor(width: number, height: number, palette: number[]);

  setPixel(i: number, j: number, paletteIndex: number): void;
  render(): void;
  findSprite(name: string): Sprite | undefined;
  findSprites(name: string): Sprite[];
  despawn(sprite: Sprite): void;
}
