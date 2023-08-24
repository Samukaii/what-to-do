import { signal, WritableSignal } from "@angular/core";

export const createInputSignals = <T, K extends keyof T>(component: T, ...keys: K[]) => {
	const signals: {
		[k in K]: WritableSignal<T[k]>
	} = {} as any;

	keys.forEach((key) => {
		signals[key] = signal(component[key]);
	});

	return signals;
};