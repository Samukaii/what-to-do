export type UndefinedToNull<T> = T extends Exclude<T, undefined> ? T : null;
export type UndefinedToVoid<T> = T extends Exclude<T, undefined> ? T : void;
