import { ref } from "vue";
import { Canvas, PALETTE } from "./components/Canvas/Canvas";

export type State = {
    currentColor: PALETTE;
    grid: PALETTE[][];
    size: number;
};

export type Actions = {
    setGrid: (nextGrid: PALETTE[][]) => void;
    updateGrid: (x: number, y: number, color: PALETTE) => void;
    setCurrentColor: (nextCurrentColor: PALETTE) => void;
};

export const store = ref<State & Actions>({
    currentColor: PALETTE.BACKGROUND,
    grid: Canvas.createGrid(),
    size: 0,
    setGrid: (nextGrid) => {
        store.value.grid = nextGrid;
    },
    updateGrid: (x, y, color) => {
        // https://vuejs.org/guide/essentials/list.html#array-change-detection
        // will trigger reactivity and vue with diff the dom appropriately
        store.value.grid = store.value.grid.map((row, rowY) =>
            rowY === y
                ? row.map((cell, cellX) => (cellX === x ? color : cell))
                : row,
        );
    },
    setCurrentColor: (nextCurrentColor) => {
        store.value.currentColor = nextCurrentColor;
    },
});
