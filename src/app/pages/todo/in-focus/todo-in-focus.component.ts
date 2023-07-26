import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';
import { ButtonActionsFn } from '../../../shared/components/button/types/button-actions-fn';

@Component({
  selector: 'app-todo-in-focus',
  templateUrl: './todo-in-focus.component.html',
  styleUrls: ['./todo-in-focus.component.scss']
})
export class TodoInFocusComponent {
  @Output() toggle = new EventEmitter<Todo>();
  @Input({required: true}) current!: Todo;
  @Input() actionsFn: ButtonActionsFn<Todo> = () => [];
}
