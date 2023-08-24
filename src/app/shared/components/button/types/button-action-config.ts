import { Generic } from '../../../types/generic';
import { ButtonActionOptions } from './button-action-options';
import { ButtonActionTypes } from './button-action-types';


export type ButtonActionConfig = {
	[K in ButtonActionTypes]: ButtonActionOptions<K> extends Generic ? {
		type: K;
		options: ButtonActionOptions<K>;
	} : {
		type: K;
	};
}[ButtonActionTypes];
