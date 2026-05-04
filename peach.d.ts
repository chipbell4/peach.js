export declare class EventEmitter {
  addEventListener(name: string, callback: Function): void;
  removeEventListener(name: string, callback: Function): boolean;
  trigger(name: string, data?: any): void;
}

export declare type Bitmap = number[][];

export declare interface AnimatorOptions {
  sprite: Sprite;
  bitmaps: Bitmap[];
  fps?: number;
  loop?: boolean;
}

export declare class Animator extends EventEmitter {
  sprite: Sprite;
  bitmaps: Bitmap[];
  fps: number;
  loop: boolean;
  started: boolean;
  currentAnimationFrame: number;
  timeTillNextFrame: number;

  constructor(options: AnimatorOptions);

  start(): void;
  stop(): void;
  update(deltaTime?: number): void;
}

export declare class Sprite {
  bitmap: Bitmap;
  paletteAssignment: number[];
  x: number;
  y: number;

  constructor(bitmap: Bitmap, paletteAssignment: number[]);

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
