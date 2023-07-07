import { SimpleChanges } from "@angular/core";

export const whenInputChange = <T, K extends keyof T>(component: T, prop: K, callBack: (value: T[K]) => void) => {
  const onChanges = (component as any).ngOnChanges ?? (() => {});

  (component as any).ngOnChanges = (changes: SimpleChanges) => {
    if(changes?.[prop as string]){
      callBack(changes?.[prop as string].currentValue);
    }

    onChanges.call(component)
  };

  return component[prop];
}
