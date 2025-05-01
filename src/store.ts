import { ref } from "vue";
import { PALETTE } from "./components/Canvas/Canvas";

export const store = ref({
    currentColor: PALETTE.BACKGROUND,
    width: 0,
    height: 0,
});
