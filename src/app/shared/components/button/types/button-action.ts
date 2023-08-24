import { ButtonActionConfig } from './button-action-config';

export type ButtonAction = ButtonActionConfig & {
	condition?: boolean;
	click: () => void;
};

