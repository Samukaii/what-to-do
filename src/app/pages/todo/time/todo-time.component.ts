import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
  effect,
  signal,
  computed,
  ViewChild, Signal, Output, EventEmitter, inject
} from '@angular/core';
import { Todo } from '../models/todo';
import { inputSignal } from "../../../shared/utils/input-signal";
import { WithSignals } from "../../../shared/decorators/with-signals";
import { CounterComponent } from "../../../shared/components/counter/counter.component";
import { ButtonAction } from "../../../shared/components/button/types/button-action";
import { ButtonActionsFn } from "../../../shared/components/button/types/button-actions-fn";
import { whenInputChange } from "../../../shared/utils/when-input-change";
import { TimeHelpers } from '../../../shared/utils/time-helpers';
import { TodoTimerService } from '../todo-timer.service';

@WithSignals()
@Component({
  selector: 'app-todo-time',
  templateUrl: './todo-time.component.html',
  styleUrls: ['./todo-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoTimeComponent {
  @Output() timeSpent = new EventEmitter<number>();
  @Input({required: true}) currentTodo!: Todo;

  protected counter = inject(TodoTimerService);

  protected timeFormatted = computed(() => TimeHelpers.secondsToTime(this.counter.currentTime()))

  actionsFn: Signal<ButtonActionsFn> = computed(() => {
    return () => [
      {
        type: "raised",
        click: () => {
          this.counter.pause();
        },
        condition: !this.counter?.isPaused(),
        options: {
          text: "Pausar",
          icon: "pause",
          color: "primary"
        }
      },
      {
        type: "raised",
        click: () => {
          this.counter.resume();
        },
        condition: this.counter?.isPaused(),
        options: {
          text: "Continuar",
          icon: "play_arrow",
          color: "primary"
        }
      }
    ];
  })
}
