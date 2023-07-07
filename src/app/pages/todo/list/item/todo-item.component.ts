import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { ButtonAction } from 'src/app/shared/components/button/types/button-action';
import { Todo } from '../../models/todo';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  @Output() toggle = new EventEmitter<Todo>();
  @Input({ required: true }) item!: Todo
  @Input() actions: ButtonAction<Todo>[] = [];

  @HostBinding("class.todo-completed")
  get completed(){
    return this.item.completed;
  }
}
