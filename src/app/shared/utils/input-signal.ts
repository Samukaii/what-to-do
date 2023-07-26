import { computed, Signal, signal, SimpleChanges, WritableSignal } from "@angular/core";

export const writableInputSignal = <T, K extends keyof T>(component: T, key: K): WritableSignal<T[K]> => {
  const onChanges = (component as any).ngOnChanges;
  const signalProperty = signal(component[key]);

  if(!onChanges)
    throw new Error("inputSignal can only be used if the component has the \"WithSignals\" decorator");

  (component as any).ngOnChanges = (changes: SimpleChanges) => {
    if(changes?.[key as string]){
      signalProperty.set(component[key])
    }

    onChanges.call(component)
  };

  return signalProperty;
}

export const inputSignal = <T, K extends keyof T>(component: T, key: K): Signal<T[K]> =>
  computed(() => writableInputSignal(component, key)());


