import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TodoForm } from '../models/todo-form';
import { ButtonAction } from "../../../shared/components/button/types/button-action";

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoFormComponent {
  @Input() principalTitle?: string;
  @Input({required: true}) form!: TodoForm;
  @Input() actions: ButtonAction[] = [];
}
