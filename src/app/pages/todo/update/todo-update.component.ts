import {ChangeDetectionStrategy, Component, HostListener, inject, OnInit} from '@angular/core';
import {TodoForm} from '../models/todo-form';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormValue} from "../../../shared/types/form-value";
import {Todo} from "../models/todo";
import {TodoService} from "../todo.service";
import {ButtonAction} from "../../../shared/components/button/types/button-action";
import {DialogService} from "../../../shared/services/dialog.service";
import { createTodoForm } from "../form/create-todo-form";

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoUpdateComponent implements OnInit {
  data: {
    todo: Todo;
    onSend: (form: FormValue<TodoForm>) => void;
  } = inject(MAT_DIALOG_DATA);

  dialog = inject(DialogService);
  form = createTodoForm();

  actions: ButtonAction[] = [
    {
      type: "raised",
      click: () => this.onSend(),
      options: {
        text: "Salvar",
        color: "primary"
      }
    }
  ];

  onSend() {
    this.dialog.close();
    this.data.onSend(this.form.getRawValue())
  }

  ngOnInit() {
    this.form.patchValue(this.data.todo);
  }
}
