import invariant from "tiny-invariant";

type CanvasArgs = {
    size: number;
    canvas: HTMLCanvasElement;
};

export const SIZE = 10;

const MARGIN = 1;
const SCALE = 10;

export enum PALETTE {
    BACKGROUND = "#710b2c",
    FILL = "#fd8978",
}

export class Canvas {
    private size: number;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private grid: PALETTE[][];

    constructor({ size, canvas }: CanvasArgs) {
        this.size = size;
        this.canvas = canvas;

        const ctx = this.canvas.getContext("2d");
        invariant(ctx, "expected canvas context");
        this.ctx = ctx;

        this.resize();
        this.grid = this.randomGrid();

        this.render();
    }

    private createGrid() {
        return new Array(SIZE)
            .fill(0)
            .map(() => new Array(SIZE).fill(PALETTE.BACKGROUND));
    }

    randomGrid() {
        const grid = this.createGrid();
        for (let y = MARGIN; y < SIZE - MARGIN; y++) {
            for (let x = MARGIN; x < SIZE - MARGIN; x++) {
                const color =
                    Math.random() > 0.5 ? PALETTE.BACKGROUND : PALETTE.FILL;
                grid[y][x] = color;
                grid[y][SIZE - x - 1] = color;
            }
        }
        return grid;
    }

    get scaledSize() {
        return this.size * SCALE;
    }

    resize() {
        this.canvas.width = this.scaledSize;
        this.canvas.height = this.scaledSize;
        this.canvas.style.width = `${this.size}px`;
        this.canvas.style.height = `${this.size}px`;
    }

    render() {
        const cellSize = this.scaledSize / SIZE;

        // fill background
        this.ctx.fillStyle = PALETTE.BACKGROUND;
        this.ctx.fillRect(0, 0, this.scaledSize, this.scaledSize);

        // fill in cells
        this.ctx.fillStyle = PALETTE.FILL;
        for (let y = 0; y < SIZE; y++) {
            for (let x = 0; x < SIZE; x++) {
                if (this.grid[y][x] === PALETTE.FILL) {
                    this.ctx.fillRect(
                        (x / SIZE) * this.scaledSize,
                        (y / SIZE) * this.scaledSize,
                        cellSize,
                        cellSize,
                    );
                }
            }
        }
    }
}
