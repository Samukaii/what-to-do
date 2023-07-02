import { Injectable, effect, signal } from '@angular/core';
import { generateId } from 'src/app/shared/utils/id-generator';
import { CreateTodoForm, FormValue } from './models/create-todo-form';
import { Todo } from './models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = signal(this.getStorage());

  saveOnStorage = effect(() => {
    localStorage.setItem('todo-list', JSON.stringify(this.todos()))
  })

  logTodoChange = effect(() => {
    console.log(this.todos())
  });

  delete(todo: Todo) {
    this.todos.update(todos => todos.filter(item => item.id !== todo.id));
  }

  toggle(todo: Todo) {
    this.todos.update(todos => todos.map(item => {
      if (item.id !== todo.id) return item

      return {
        ...item,
        completed: !item.completed
      }
    }))
  }

  create(value: FormValue<CreateTodoForm>) {
    const { title, description } = value;
    if (!title) return;

    this.todos.update(items => [...items, {
      id: generateId(),
      title,
      description: description ?? undefined,
      completed: false
    }]);
  }

  private getStorage(): Todo[] {
    const fromStorage = localStorage.getItem('todo-list') || "[]";

    return JSON.parse(fromStorage);
  }
}
