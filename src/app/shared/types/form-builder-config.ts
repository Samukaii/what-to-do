import { Generic } from 'src/app/shared/types/generic';
import { ControlBuilderConfig } from './control-builder-config';

export type FormBuilderConfig<T extends Generic> = {
	[K in keyof T]: ControlBuilderConfig<T[K]>;
};
