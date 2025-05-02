import invariant from "tiny-invariant";
import type { Actions } from "../../store";
import { eventBus } from "../../eventBus";

type CanvasArgs = {
    size: number;
    canvas: HTMLCanvasElement;

    setGrid: Actions["setGrid"];
    updateGrid: Actions["updateGrid"];
};

export const SIZE = 10;

const MARGIN = 1;
const SCALE = 10;

export enum PALETTE {
    BACKGROUND = "#710b2c",
    FILL = "#fd8978",
}

export class Canvas {
    private container: HTMLElement;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private animationId: number | null = null;

    private size: number;
    private grid: PALETTE[][];

    private mouse = { x: 0, y: 0, hover: false, down: false };
    private currentColor = PALETTE.BACKGROUND;

    // probably a much better way to sync the canvas, but I don't really care
    // when we change the canvas internally, broadcast changes to state
    private updateGrid: Actions["updateGrid"];
    private setGrid: Actions["setGrid"];

    constructor({ canvas, updateGrid, setGrid }: CanvasArgs) {
        this.canvas = canvas;
        this.updateGrid = updateGrid;
        this.setGrid = setGrid;

        const container = canvas.parentElement;
        invariant(container, "expected canvas parent");
        this.container = container;

        invariant(
            container.clientWidth === container.clientHeight,
            "expected canvas to be square",
        );
        this.size = container.clientWidth;

        const ctx = this.canvas.getContext("2d");
        invariant(ctx, "expected canvas context");
        this.ctx = ctx;

        this.resize();
        this.grid = Canvas.randomGrid();
        this.setGrid(this.grid);

        this.render();
        this.mount();
    }

    get renderSize() {
        return this.size * SCALE;
    }

    setCurrentColor(nextCurrentColor: PALETTE) {
        this.currentColor = nextCurrentColor;
    }

    static createGrid(): PALETTE[][] {
        return new Array(SIZE)
            .fill(0)
            .map(() => new Array(SIZE).fill(PALETTE.BACKGROUND));
    }

    clear() {
        this.grid = Canvas.createGrid();
        this.setGrid(this.grid);
    }

    randomize() {
        this.grid = Canvas.randomGrid();
        this.setGrid(this.grid);
    }

    static randomGrid(threshold = 0.5): PALETTE[][] {
        const grid = Canvas.createGrid();
        for (let y = MARGIN; y < SIZE - MARGIN; y++) {
            for (let x = MARGIN; x < SIZE - MARGIN; x++) {
                const color =
                    Math.random() > threshold ? PALETTE.BACKGROUND : PALETTE.FILL;
                grid[y][x] = color;
                grid[y][SIZE - x - 1] = color;
            }
        }
        return grid;
    }

    resize() {
        this.canvas.width = this.renderSize;
        this.canvas.height = this.renderSize;
        this.container.style.width = `${this.size}px`;
        this.container.style.height = `${this.size}px`;
        this.canvas.style.width = `${this.size}px`;
        this.canvas.style.height = `${this.size}px`;
    }

    render = () => {
        // fill background
        this.ctx.fillStyle = PALETTE.BACKGROUND;
        this.ctx.fillRect(0, 0, this.renderSize, this.renderSize);

        // fill in cells
        this.ctx.fillStyle = PALETTE.FILL;
        for (let y = 0; y < SIZE; y++) {
            for (let x = 0; x < SIZE; x++) {
                if (this.grid[y][x] === PALETTE.FILL) {
                    this.drawCell(x, y);
                }
            }
        }

        if (this.mouse.hover) {
            // get mouse pos on grid
            const { x, y } = this.mouseToGrid();
            this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            this.drawCell(x, y);
        }

        if (this.mouse.down) {
            const { x, y } = this.mouseToGrid();
            this.grid[y][x] = this.currentColor;
            this.updateGrid(x, y, this.currentColor);
        }

        this.animationId = requestAnimationFrame(this.render);
    };

    /** Utility to draw a specific cell */
    private drawCell(x: number, y: number) {
        const cellSize = this.renderSize / SIZE;
        this.ctx.fillRect(
            (x / SIZE) * this.renderSize,
            (y / SIZE) * this.renderSize,
            cellSize,
            cellSize,
        );
    }

    /** Convert mouse coords to grid indices  */
    private mouseToGrid() {
        const x = Math.floor((this.mouse.x / this.size) * SIZE);
        const y = Math.floor((this.mouse.y / this.size) * SIZE);
        return {
            x: Math.max(Math.min(x, SIZE - 1), 0),
            y: Math.max(Math.min(y, SIZE - 1), 0),
        };
    }

    private getMousePos(e: MouseEvent) {
        const bbox = this.container.getBoundingClientRect();
        this.mouse.x = e.clientX - bbox.left;
        this.mouse.y = e.clientY - bbox.top;
    }

    onMouseEnter = (e: MouseEvent) => {
        this.getMousePos(e);
        this.mouse.hover = true;
    };

    onMouseLeave = (e: MouseEvent) => {
        this.getMousePos(e);
        this.mouse.hover = false;
        this.mouse.down = false;
    };

    onMouseMove = (e: MouseEvent) => {
        this.getMousePos(e);
    };

    onMouseUp = (e: MouseEvent) => {
        this.getMousePos(e);
        this.mouse.down = false;
    };

    onMouseDown = (e: MouseEvent) => {
        this.getMousePos(e);
        this.mouse.down = true;
    };

    // when we change the canvas externally, update the internal canvas
    onSyncCanvas = (grid: PALETTE[][]) => {
        this.grid = grid;
    }

    mount() {
        this.canvas.addEventListener("mouseenter", this.onMouseEnter);
        this.canvas.addEventListener("mouseleave", this.onMouseLeave);
        this.canvas.addEventListener("mousemove", this.onMouseMove);
        this.canvas.addEventListener("mousedown", this.onMouseDown);
        this.canvas.addEventListener("mouseup", this.onMouseUp);
        eventBus.on("syncCanvas", this.onSyncCanvas);
    }

    unmount() {
        this.canvas.removeEventListener("mouseenter", this.onMouseEnter);
        this.canvas.removeEventListener("mouseleave", this.onMouseLeave);
        this.canvas.removeEventListener("mousemove", this.onMouseMove);
        this.canvas.removeEventListener("click", this.onMouseMove);
        this.canvas.addEventListener("mouseup", this.onMouseUp);
        eventBus.off("syncCanvas", this.onSyncCanvas);

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        this.animationId = null;
    }
}
