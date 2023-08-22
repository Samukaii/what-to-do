import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { Todo } from "../models/todo";

@Component({
  selector: 'app-todo-info',
  templateUrl: './todo-info.component.html',
  styleUrls: ['./todo-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoInfoComponent {
  todo!: Todo;
  timeSpent!: number;

  @HostBinding("class.mat-elevation-z2") elevation = true;
}
