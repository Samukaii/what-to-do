import { WritableSignal } from "@angular/core";

export type InputSignals<T, K extends keyof T> = {
	[k in K]: WritableSignal<T[k]>
}
