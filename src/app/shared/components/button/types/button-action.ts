import { Todo } from 'src/app/pages/todo/models/todo';
import { ButtonActionConfig } from './button-action-config';

export type ButtonAction<T = void> = ButtonActionConfig & {
    condition?: boolean;
    click: (context: T) => void;
};
