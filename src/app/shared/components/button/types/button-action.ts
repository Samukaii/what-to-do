import { Todo } from 'src/app/pages/home/models/todo';
import { ButtonActionConfig } from './button-action-config';

export type ButtonAction<T = void> = ButtonActionConfig & {
    condition?: boolean;
    click: (context: T) => void;
};
