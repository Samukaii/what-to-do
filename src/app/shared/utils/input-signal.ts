import { computed, Signal, signal, SimpleChanges, WritableSignal } from "@angular/core";

export const writableInputSignal = <T, K extends keyof T>(component: T, key: K): WritableSignal<T[K]> => {
  const onChanges = (component as any).ngOnChanges;
  const signalProperty = signal(component[key]);

  (component as any).ngOnChanges = (changes: SimpleChanges) => {
    if(changes?.[key as string]){
      console.log(changes)
      signalProperty.set(component[key])
    }

    onChanges.call(component)
  };

  // Object.defineProperty(component, "ngOnChanges", {
  //   value: (changes: SimpleChanges) => {
  //     if(changes?.[key as string]){
  //       console.log(changes)
  //       signalProperty.set(component[key])
  //     }
  //
  //     onChanges.call(component)
  //   },
  //   writable: true
  // });


  return signalProperty;
}

export const inputSignal = <T, K extends keyof T>(component: T, key: K): Signal<T[K]> =>
  computed(() => writableInputSignal(component, key)());


