import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
  effect,
  signal,
  computed,
  ViewChild, Signal, Output, EventEmitter
} from '@angular/core';
import { Todo } from '../models/todo';
import { inputSignal } from "../../../shared/utils/input-signal";
import { WithSignals } from "../../../shared/decorators/with-signals";
import { CounterComponent } from "../../../shared/components/counter/counter.component";
import { ButtonAction } from "../../../shared/components/button/types/button-action";
import { ButtonActionsFn } from "../../../shared/components/button/types/button-actions-fn";
import { whenInputChange } from "../../../shared/utils/when-input-change";

@WithSignals()
@Component({
  selector: 'app-todo-time',
  templateUrl: './todo-time.component.html',
  styleUrls: ['./todo-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoTimeComponent {
  @ViewChild(CounterComponent, {static: true}) counter!: CounterComponent;
  @Output() timeSpent = new EventEmitter<number>();
  @Input({required: true}) currentTodo!: Todo;
  @Input() restTime = 5 * 60;
  @Input() workTime = 25 * 60;

  isRest = signal(false);
  currentCycle = signal(0);

  currentTodoSignal = whenInputChange(this, "currentTodo", () => {
    this.counter.restart();
  });

  emitTimeSpent = effect(() => {
    const time = (this.currentCycle() * (this.restTime * this.workTime))
    this.timeSpent.emit(time);
  })

  actionsFn: Signal<ButtonActionsFn> = computed(() => {
    return () => [
      {
        type: "raised",
        click: () => {
          this.counter.pause();
        },
        condition: this.counter?.isCounting(),
        options: {
          text: "Pausar",
          icon: "pause",
          color: "primary"
        }
      },
      {
        type: "raised",
        click: () => {
          this.counter.play();
        },
        condition: !this.counter?.isCounting(),
        options: {
          text: "Continuar",
          icon: "play_arrow",
          color: "primary"
        }
      }
    ];
  })

  protected timeCount = computed(() => {
    return this.isRest() ? this.restTime : this.workTime;
  })

  protected onFinish() {
    if (this.isRest()) {
      this.isRest.set(false);
      this.currentCycle.update(cycle => cycle + 1);
    } else this.isRest.set(true);
  }
}
