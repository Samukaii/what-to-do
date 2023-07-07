import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';
import { ButtonAction } from 'src/app/shared/components/button/types/button-action';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @Output() toggle = new EventEmitter<Todo>();
  @Input({required: true}) items!: Todo[];
  @Input() actions: ButtonAction<Todo>[] = [];
}
