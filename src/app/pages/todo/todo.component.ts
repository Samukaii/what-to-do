import {Component, computed, HostListener, inject, OnInit, signal} from '@angular/core';
import {TodoService} from "./todo.service";
import {Todo} from "./models/todo";
import {ButtonAction} from "../../shared/components/button/types/button-action";
import {DialogService} from "../../shared/services/dialog.service";
import {TodoUpdateComponent} from "./update/todo-update.component";
import {TodoCreateComponent} from "./create/todo-create.component";
import { ButtonActionsFn } from "../../shared/components/button/types/button-actions-fn";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";


@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  service = inject(TodoService);
  currentTodoId = signal<number | undefined>(undefined);

  todoInFocus = computed(() => {
    const all = this.service.todos();
    return all.find(todo => todo.id === this.currentTodoId());
  });

  otherTodos = computed(() => {
    return this.service.todos().filter((todo) => this.todoInFocus()?.id !== todo.id);
  })
  dialog = inject(DialogService);

  actionsFn: ButtonActionsFn<Todo> = (todo): ButtonAction[] => {
    return [
      {
        type: "icon",
        click: () => this.focus(todo),
        options: {
          color: "primary",
          icon: "play_circle"
        }
      },
      {
        type: "icon",
          click: () => this.edit(todo),
        options: {
        color: "primary",
          icon: "edit"
      }
      },
      {
        type: "icon",
          click: () => this.delete(todo),
        options: {
        color: "warn",
          icon: "delete"
      }
      }
    ]
  };

  createButtonFn = (): ButtonAction[] => [{
    type: "raised",
    click: () => this.create(),
    options: {
      icon: "add",
      color: "primary",
      text: "Nova tarefa"
    }
  }];

  @HostListener('window:keydown.control.z')
  recover(){
    this.service.recover();
  }

  ngOnInit() {
    this.currentTodoId.set(this.service.todos()[0]?.id);
  }

  focus(todo: Todo) {
    this.currentTodoId.set(todo.id);
  }

  edit(todo: Todo) {
    this.dialog.open(TodoUpdateComponent, {
      data: {
        todo,
        onSend: changes => this.service.update(todo.id, changes)
      }
    })
  }

  delete(todo: Todo) {
    this.service.delete(todo)
  }

  toggle(todo: Todo){
    this.service.toggle(todo)
  }

  reorder(event: CdkDragDrop<Todo>){
    this.service.reorder(event);
  }

  create() {
    this.dialog.open(TodoCreateComponent, {
      data: {
        onSend: changes => this.service.create(changes)
      }
    })
  }
}
