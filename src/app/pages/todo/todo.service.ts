import { effect, inject, Injectable, signal } from '@angular/core';
import { generateId } from 'src/app/shared/utils/id-generator';
import { TodoForm } from './models/todo-form';
import { Todo } from './models/todo';
import { FormValue } from "../../shared/types/form-value";
import { TrashService } from "../../shared/services/trash.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { TodoTimerService } from "./todo-timer.service";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = signal(this.getStorage());
  private trashKey = "todos";
  private trash = inject(TrashService);
  private timer = inject(TodoTimerService);

  saveOnStorage = effect(() => {
    localStorage.setItem('list', JSON.stringify(this.todos()))
  })

  delete(todo: Todo) {
    this.todos.update(todos => todos.filter((item, index) => {
      if(item.id === todo.id)
        this.trash.moveToTrash(this.trashKey, {
          item: todo,
          metadata: {
            index
          }
        });

      return item.id !== todo.id
    }));
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

  reorder(event: CdkDragDrop<Todo>){
    const inFocus = this.todos().find(todo => todo.inFocus);
    const notInFocus = this.todos().filter(todo => !todo.inFocus)
    const result: Todo[] = [...notInFocus];

    moveItemInArray(result, event.previousIndex, event.currentIndex);

    if(inFocus) result.unshift(inFocus);

    this.todos.set(result);
  }

  recover(){
    const deleted = this.trash.recoverLast<Todo, {index: number}>(this.trashKey);

    if(!deleted) return;

    this.todos.update(todos => {
      const newTodos = [...todos];
      newTodos.splice(deleted.metadata!.index, 0, deleted.item);

      return newTodos;
    });
  }

  create(value: FormValue<TodoForm>) {
    const { title, description, cycles } = value;
    if (!title) return;

    this.todos.update(items => [{
      id: generateId(),
      title,
      cycles,
      description: description ?? "",
      completed: false,
      inFocus: false,
      timeSpent: 0
    }, ...items]);
  }

  currentInFocus = () => this.todos().find(todo => todo.inFocus);

  focus(id: number){
    this.saveTimeSpent();

    this.todos.update(todos => {
      return todos.map(todo => {
        if(todo.id !== id) return {
          ...todo,
          inFocus: false
        };

        return {
          ...todo,
          inFocus: true
        }
      })
    });

    this.timer.restart(this.currentInFocus()!.id)
  }

  update(id: number, changes: Partial<FormValue<TodoForm>>){
      this.todos.update(todos => {
        return todos.map(todo => {
          if(todo.id !== id) return todo;

          return {
            ...todo,
            ...changes,
            description: changes.description ?? ""
          }
        })
      })
  }

  private saveTimeSpent() {
    this.todos.update(todos => todos.map(todo => {
      if(!todo.inFocus) return todo;

      return {
        ...todo,
        timeSpent: this.timer.allTimeSpent()
      }
    }));
  }

  private getStorage(): Todo[] {
    const fromStorage = localStorage.getItem('list') || "[]";

    return JSON.parse(fromStorage);
  }
}
