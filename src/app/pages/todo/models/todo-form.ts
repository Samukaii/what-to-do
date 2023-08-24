import { FormGroupOf } from "src/app/shared/types/form-group-of";
import { TodoPriorityEnum } from "./todo-priority.enum";

export type TodoForm = FormGroupOf<{
	title: string;
	priority: TodoPriorityEnum;
	description: string | null;
	cycles: number;
}>;
