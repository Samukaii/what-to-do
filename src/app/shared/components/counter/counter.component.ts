import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
	signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithSignals } from "../../decorators/with-signals";
import { TimeHelpers } from "../../utils/time-helpers";
import { ClockComponent } from "../clock/clock.component";
import { whenInputChange } from "../../utils/when-input-change";
import { RectClockComponent } from "../rect-clock/rect-clock.component";


@WithSignals()
@Component({
	selector: 'app-counter',
	standalone: true,
	imports: [CommonModule, ClockComponent, RectClockComponent],
	templateUrl: './counter.component.html',
	styleUrls: ['./counter.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent implements OnDestroy, OnInit {
	@Output() finish = new EventEmitter();
	@Output() timeChange = new EventEmitter<number>();
	@Input({ required: true }) time = 0;

	protected counter = signal(this.time);
	emitCounterChange = effect(() => {
		this.timeChange.emit(this.counter());
	})
	protected timeFormatted = computed(() => TimeHelpers.secondsToTime(this.counter()))
	private isPlaying = signal(false);
	isCounting = computed(() => this.isPlaying())
	private interval?: number;
	private updateCounter = whenInputChange(this, "time", (time) => {
		this.counter.set(time);
	});

	ngOnInit() {
		this.setupCounter();
	}

	pause() {
		this.isPlaying.set(false);
	}

	play() {
		this.isPlaying.set(true);
	}

	restart() {
		this.counter.set(this.time);
	}

	ngOnDestroy() {
		this.clearInterval();
	}

	private setupCounter() {
		this.interval = setInterval(() => {
			if(this.counter() === 0) {
				this.finish.emit();
				return;
			}

			if(this.isPlaying()) this.counter.update(time => time - 1)
		}, 1000);
	}

	private clearInterval() {
		clearInterval(this.interval!);
	}
}
