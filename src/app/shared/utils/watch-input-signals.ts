import { SimpleChanges } from "@angular/core";
import { InputSignals } from "../types/input-signals";

export const watchInputSignals = <T, K extends keyof T>(inputSignals: InputSignals<T, K>, changes: SimpleChanges) => {
	Object.keys(inputSignals).forEach((key) => {
		if(changes[key]) {
			inputSignals[key as K].set(changes[key].currentValue);
		}
	});
};
