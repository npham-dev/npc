import { ref } from "vue";
import { PALETTE } from "./components/Canvas/Canvas";
import mitt from "mitt";

export const store = ref({
    currentColor: PALETTE.BACKGROUND,
    size: 0,

    setCurrentColor: (nextCurrentColor: PALETTE) => {
        store.value.currentColor = nextCurrentColor;
    },
});

export const emitter = mitt<{
    randomizeCanvas: void;
    clearCanvas: void;
}>();
