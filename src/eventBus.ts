import mitt from "mitt";
import { PALETTE } from "./components/Canvas/Canvas";

export const eventBus = mitt<{
    randomizeCanvas: void;
    clearCanvas: void;
    exportCanvas: void;
    syncCanvas: PALETTE[][];
}>();
