import { TodoPriorityEnum } from "./todo-priority.enum";

export interface Todo {
	id: number;
	title: string;
	description?: string;
	cycles: number;
	priority: TodoPriorityEnum;
	completed: boolean;
	inFocus: boolean;
}
