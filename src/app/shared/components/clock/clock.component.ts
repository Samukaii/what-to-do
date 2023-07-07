import { CommonModule } from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, Input} from '@angular/core';
import {inputSignal} from "../../utils/input-signal";
import { WithSignals } from "../../decorators/with-signals";

@WithSignals()
@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent {
  @Input() allTimeInSeconds = 60 * 60;
  @Input() currentSeconds = 0;

  allTimeInSecondsSignal = inputSignal(this, "allTimeInSeconds");
  currentSecondsSignal = inputSignal(this, "currentSeconds");

  pointerRotation = computed(() => {
    const degrees = (360 / this.allTimeInSecondsSignal()) * (this.allTimeInSecondsSignal() - this.currentSecondsSignal());
    return `rotateZ(${degrees}deg) scale(0.9)`
  })

  indicators = computed(() => {
    return new Array(this.allTimeInSecondsSignal())
  })
}
