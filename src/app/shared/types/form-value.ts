import {FormGroup} from "@angular/forms";

export type FormValue<T> = T extends FormGroup ? ReturnType<T["getRawValue"]> : never;
