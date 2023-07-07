import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
  effect,
  signal,
  computed,
  ViewChild
} from '@angular/core';
import { Todo } from '../models/todo';
import { inputSignal } from "../../../shared/utils/input-signal";
import { WithSignals } from "../../../shared/decorators/with-signals";
import { CounterComponent } from "../../../shared/components/counter/counter.component";

@WithSignals()
@Component({
  selector: 'app-todo-time',
  templateUrl: './todo-time.component.html',
  styleUrls: ['./todo-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoTimeComponent {
  @ViewChild(CounterComponent) counter!: CounterComponent;
  @Input() currentTodo?: Todo
  @Input() restTime = 5 * 60;
  @Input() workTime = 25 * 60;

  isRest = signal(false);
  currentCycle = signal(0);

  timeCount = computed(() => {
    return this.isRest() ? this.restTime : this.workTime;
  })

  onFinish() {
    if (this.isRest()) {
      this.isRest.set(false);
      this.currentCycle.update(cycle => cycle + 1);
    } else this.isRest.set(true);

    this.counter.restartCounter(this.timeCount());
  }
}
