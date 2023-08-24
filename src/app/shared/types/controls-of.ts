import { FormControl, FormGroup } from '@angular/forms';

type ObjectLiteral = Exclude<Record<string, any>, Record<string, undefined | null>>;

export type ControlsOf<T extends Record<string, any>> = {
	[K in keyof T]: T[K] extends ObjectLiteral ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};
