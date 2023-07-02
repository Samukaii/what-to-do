import { ChangeDetectionStrategy, Component, Input, Signal, WritableSignal, computed, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

const toSignal = <T>(time: T) => signal(time);

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  @Input({required: true, alias: "time"})
  set setTime(time: number){
    this.time.set(time)
  };

  time = signal(0);

  private startCount = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.time.update(time => time - 1)
    }, 1000);

    return onCleanup(() => clearInterval(interval))
  })

  protected timeFormatted = computed(() => {
    const time = this.time();

    let minutes: string | number = Math.floor(time / 60)
    let seconds: string | number = (time - minutes * 60)

    minutes = minutes.toString().padStart(2, '0')
    seconds = seconds.toString().padStart(2, '0')

    return `${minutes}:${seconds}`;
  })
}
