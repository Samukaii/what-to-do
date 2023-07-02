import { FormControl, FormGroup } from '@angular/forms';
import { UndefinedToNull } from './undefined-to-null';

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any> ? FormGroup<ControlsOf<T[K]>> : FormControl<T[K]>;
};
