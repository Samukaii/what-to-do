import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoViewComponent {
  service = inject(TodoService);
}
