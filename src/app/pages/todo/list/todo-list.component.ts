import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';
import { ButtonAction } from 'src/app/shared/components/button/types/button-action';
import { ButtonActionsFn } from "../../../shared/components/button/types/button-actions-fn";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @Output() toggle = new EventEmitter<Todo>();
  @Output() reorder = new EventEmitter<CdkDragDrop<Todo>>();
  @Input({required: true}) items!: Todo[];
  @Input() actionsFn: ButtonActionsFn<Todo> = () => [];
}
