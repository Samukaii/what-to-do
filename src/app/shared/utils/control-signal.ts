import { AbstractControl, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ControlsOf } from '../types/controls-of';
import { Generic } from '../types/generic';
import { Signal } from '@angular/core';

type FormKey<Form> = Form extends ControlsOf<Record<infer Key, any>>? Key: never;
type FormValue<Form, Key extends FormKey<Form>> = Form extends ControlsOf<Record<Key, infer Value>>? Value: never;


export const controlSignal = <T extends Generic, K extends FormKey<T>>(form: FormGroup<T>, name: K) => {
  const control = form.get(name);

  if (!control)
    throw new Error(`O campo "${name}" não foi encontrado no formulário`);
  const value$ = control.valueChanges.pipe(startWith(control.value));

  return toSignal(value$) as Signal<FormValue<T, K>>;
};
