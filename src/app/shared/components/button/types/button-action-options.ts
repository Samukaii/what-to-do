import { Generic } from '../../../types/generic';
import { AllActionComponents } from './all-action-components';
import { ButtonActionTypes } from './button-action-types';


export type ButtonActionOptions<K extends ButtonActionTypes> = AllActionComponents[K] extends {
	options: Generic;
} ? AllActionComponents[K]["options"] : void;
