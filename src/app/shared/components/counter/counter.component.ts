import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Signal,
  WritableSignal,
  computed,
  effect,
  signal,
  OnInit, OnDestroy, Output, EventEmitter, inject, ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithSignals } from "../../decorators/with-signals";
import { inputSignal, writableInputSignal } from "../../utils/input-signal";

const toSignal = <T>(time: T) => signal(time);

@WithSignals()
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnDestroy, OnInit {
  @Output() finish = new EventEmitter();
  @Input({required: true}) time!: number;

  counter = signal(this.time);
  interval?: number;

  ngOnInit() {
    this.restartCounter(this.time);
  }

  restartCounter(time: number){
    this.counter.set(time);

    this.interval = setInterval(() => {
      if(this.counter() === 0){
        this.finish.emit();
        this.clearInterval();
        return;
      }

      this.counter.update(time => time - 1)
    }, 1000);
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  protected timeFormatted = computed(() => {
    const time = this.counter();

    let minutes: string | number = Math.floor(time / 60)
    let seconds: string | number = (time - minutes * 60)

    minutes = minutes.toString().padStart(2, '0')
    seconds = seconds.toString().padStart(2, '0')

    return `${minutes}:${seconds}`;
  })

  private clearInterval(){
    clearInterval(this.interval!);
  }
}
