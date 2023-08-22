import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input, OnChanges, SimpleChanges } from '@angular/core';
import { watchInputSignals } from "../../utils/watch-input-signals";
import { createInputSignals } from "../../utils/create-input-signals";

@Component({
    selector: 'app-clock',
    templateUrl: './clock.component.html',
    styleUrls: ['./clock.component.scss'],
    imports: [CommonModule],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClockComponent implements OnChanges {
    @Input() allTimeInSeconds = 60 * 60;
    @Input() currentSeconds = 0;

    inputs = createInputSignals(this, "allTimeInSeconds", "currentSeconds")

    pointerRotation = computed(() => {
        const degrees = (360 / this.inputs.allTimeInSeconds()) * (this.inputs.allTimeInSeconds() - this.inputs.currentSeconds());
        return `rotateZ(${ degrees }deg) scale(0.9)`
    })

    indicators = computed(() => {
        return new Array(Math.floor(this.inputs.allTimeInSeconds()))
    })

    ngOnChanges(changes: SimpleChanges) {
        watchInputSignals(this.inputs, changes)
    }
}
