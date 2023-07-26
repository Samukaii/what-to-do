import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { whenInputChange } from "../../utils/when-input-change";
import { inputSignal } from "../../utils/input-signal";
import { WithSignals } from "../../decorators/with-signals";

const createArray = (size: number) => {
  return new Array(size).fill(null).map((value, index) => index + 1);
}


@WithSignals()
@Component({
  selector: 'app-cycles-counter',
  templateUrl: './cycles-counter.component.html',
  styleUrls: ['./cycles-counter.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CyclesCounterComponent {
  @Input({ required: true }) total!: number;
  @Input() completed = 0;

  totalSignal = inputSignal(this, 'total');
  completedSignal = inputSignal(this, 'completed');

  cycles = computed(() => {
    return createArray(this.completedSignal()).map((value) => {
      return this.completedSignal() > value;
    })
  })
}
