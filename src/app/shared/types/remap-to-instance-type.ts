import { Generic } from './generic';

export type RemapToInstanceType<T extends Generic> = {
    [K in keyof T]: InstanceType<T[K]>;
};
