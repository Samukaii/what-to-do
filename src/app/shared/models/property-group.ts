export type PropertyGroup<T, K extends keyof T> = { [k in K]: T[k] } & { list: T[] };
