import { ChangeDetectionStrategy, Component, Input, SimpleChanges, effect, signal } from '@angular/core';
import { Todo } from '../models/todo';

const fromInput = <T>(component: T, key: keyof T) => {
  const onChanges = (component as any).ngOnChanges;
  const sg = signal(component[key]);

  (component as any).ngOnChanges = (changes: SimpleChanges) => {
    console.log(changes)
    if(changes[key as string])
      sg.set(component[key])

      onChanges.call(component)
  }

  return sg;
}

@Component({
  selector: 'app-todo-time',
  templateUrl: './todo-time.component.html',
  styleUrls: ['./todo-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoTimeComponent {
  @Input() currentTodo?: Todo

  a = fromInput(this, "currentTodo");

  b = effect(() => {
    console.log(this.a())
  })
}
