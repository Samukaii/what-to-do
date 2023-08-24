import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TodoForm } from "../models/todo-form";
import { TodoPriorityEnum } from "../models/todo-priority.enum";

export const createTodoForm = () => {
	return inject(FormBuilder).nonNullable.group({
		title: ["", Validators.required],
		description: [null],
		priority: [TodoPriorityEnum.MEDIUM],
		cycles: [0],
	}) as TodoForm;
}
