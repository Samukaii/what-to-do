import {
	ChangeDetectionStrategy,
	Component,
	computed,
	EventEmitter,
	inject,
	Input,
	Output,
	Signal
} from '@angular/core';
import { Todo } from '../models/todo';
import { ButtonActionsFn } from "../../../shared/components/button/types/button-actions-fn";
import { TodoTimerService } from '../todo-timer.service';

@Component({
	selector: 'app-todo-time',
	templateUrl: './todo-time.component.html',
	styleUrls: ['./todo-time.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoTimeComponent {
	@Output() timeSpent = new EventEmitter<number>();
	@Input({ required: true }) currentTodo: Todo | undefined;

	protected counter = inject(TodoTimerService);

	currentCounter = computed(() => this.counter.currentCounterDecrescent());

	actionsFn: Signal<ButtonActionsFn> = computed(() => {
		return () => [
			{
				type: "raised",
				click: () => {
					this.counter.pause();
				},
				condition: this.counter?.status() === "playing",
				options: {
					text: "Pausar",
					icon: "pause",
					color: "primary"
				}
			},
			{
				type: "raised",
				click: () => {
					this.counter.status() === "stopped"
						? this.counter.restart(this.currentTodo!.id)
						: this.counter.resume();
				},
				condition: this.counter?.status() !== "playing",
				options: {
					text: "Continuar",
					icon: "play_arrow",
					color: "primary"
				}
			}
		];
	})
}
