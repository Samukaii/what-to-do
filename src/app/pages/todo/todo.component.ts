import { Component, HostListener, inject } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TodoService} from "./todo.service";
import {Todo} from "./models/todo";
import {ButtonAction} from "../../shared/components/button/types/button-action";
import {DialogService} from "../../shared/services/dialog.service";
import {TodoForm} from "./models/todo-form";
import {TodoUpdateComponent} from "./update/todo-update.component";
import {FormValue} from "../../shared/types/form-value";
import {TodoCreateComponent} from "./create/todo-create.component";


@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
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

  createButton: ButtonAction = {
    type: "raised",
    click: () => this.create(),
    options: {
      icon: "add",
      color: "primary",
      text: "Nova tarefa"
    }
  }

  dialog = inject(DialogService);

  @HostListener('window:keydown.control.z')
  recover(){
    console.log("Recovering...")
    this.service.recover();
  }

  start(todo: Todo) {
    this.currentTodo = todo;
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

  create() {
    this.dialog.open(TodoCreateComponent, {
      data: {
        onSend: changes => this.service.create(changes)
      }
    })
  }
}
