import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo';
import { ButtonActionsFn } from "../../../../shared/components/button/types/button-actions-fn";


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Output() toggle = new EventEmitter<Todo>();
  @Input({ required: true }) item!: Todo
  @Input() showTimeSpend = true;
  @Input() actionsFn: ButtonActionsFn<Todo> = () => [];

  @HostBinding("class.todo-completed")
  get completed(){
    return this.item.completed;
  }
}
