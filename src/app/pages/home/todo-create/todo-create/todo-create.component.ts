import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CreateTodoForm, FormValue } from '../../models/create-todo-form';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCreateComponent {
  @Output() send = new EventEmitter<FormValue<CreateTodoForm>>();
  @Input({ required: true }) form!: CreateTodoForm;

  @HostListener("keyup.enter")
  onSend = () => this.send.emit(this.form.getRawValue())
}
