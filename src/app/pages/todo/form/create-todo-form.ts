import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { TodoForm } from "../models/todo-form";

export const createTodoForm = () => {
  return inject(FormBuilder).nonNullable.group({
    title: ["", Validators.required],
    description: [null],
    cycles: [0],
  }) as TodoForm;
}
