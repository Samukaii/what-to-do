import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { watchInputSignals } from "../../utils/watch-input-signals";
import { createInputSignals } from "../../utils/create-input-signals";

const createArray = (size: number) => {
	return new Array(size).fill(null).map((value, index) => index + 1);
}


@Component({
	selector: 'app-cycles-counter',
	templateUrl: './cycles-counter.component.html',
	styleUrls: ['./cycles-counter.component.scss'],
	standalone: true,
	imports: [CommonModule, MatIconModule],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CyclesCounterComponent implements OnChanges {
	@Input({ required: true }) total!: number;
	@Input() completed = 0;

	inputs = createInputSignals(this, 'completed', 'total')

	cycles = computed(() => {
		const list = createArray(Math.max(this.inputs.total(), this.inputs.completed()));

		return list.map((value) => this.inputs.completed() >= value)
	})

	ngOnChanges(changes: SimpleChanges) {
		watchInputSignals(this.inputs, changes);
	}
}
