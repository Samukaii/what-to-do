import { FormControl, FormGroup } from '@angular/forms';
import { ControlsOf } from './controls-of';
import { Generic } from './generic';

export type FormGroupOf<T extends Generic> = FormGroup<ControlsOf<T>>;
