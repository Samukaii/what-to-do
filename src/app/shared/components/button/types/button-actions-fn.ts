import { ButtonAction } from "./button-action";

export type ButtonActionsFn<Args = void> = (...args: Args[]) => ButtonAction[];
