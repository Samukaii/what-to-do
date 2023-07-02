import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ButtonAction } from 'src/app/shared/components/button/types/button-action';
import { generateId } from 'src/app/shared/utils/id-generator';
import { CreateTodoForm, FormValue } from '../models/create-todo-form';
import { Todo } from '../models/todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-creator',
  templateUrl: './todo-creator.component.html',
  styleUrls: ['./todo-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCreatorComponent {
  fb = inject(FormBuilder);
  service = inject(TodoService);
  currentTodo?: Todo;

  actions: ButtonAction<Todo>[] = [
    {
      type: "icon",
      click: todo => this.start(todo),
      options: {
        color: "primary",
        icon: "play_circle"
      }
    },
    {
      type: "icon",
      click: todo => this.edit(todo),
      options: {
        color: "primary",
        icon: "edit"
      }
    },
    {
      type: "icon",
      click: todo => this.delete(todo),
      options: {
        color: "warn",
        icon: "delete"
      }
    },
  ];

  form = this.fb.nonNullable.group({
    title: ["", Validators.required],
    description: [null],
  }) as CreateTodoForm;

  start(todo: Todo) {
    this.currentTodo = todo;
  }

  edit(todo: Todo) {
    this.form.patchValue(todo);
  }

  delete(todo: Todo) {
    this.service.delete(todo)
  }

  toggle(todo: Todo){
    this.service.toggle(todo)
  }

  create(value: FormValue<CreateTodoForm>) {
    this.service.create(value);
    this.form.reset();
  }
}
