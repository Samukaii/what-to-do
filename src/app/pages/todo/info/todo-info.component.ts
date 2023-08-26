import { ChangeDetectionStrategy, Component, computed, HostBinding, inject } from '@angular/core';
import { Todo } from "../models/todo";
import { TodoTimerHelperService } from "../todo-timer-helper.service";
import { TodoTimerStorageService } from "../todo-timer-storage.service";
import { fadeAnimation } from "../../../shared/animations/fade-animation";

@Component({
	selector: 'app-todo-info',
	templateUrl: './todo-info.component.html',
	styleUrls: ['./todo-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		fadeAnimation
	]
})
export class TodoInfoComponent {
	todo!: Todo;

	helper = inject(TodoTimerHelperService);
	storage = inject(TodoTimerStorageService);

	@HostBinding('@fade') animation = true;
	@HostBinding("class.mat-elevation-z2") elevation = true;

	allTime = computed(() => {
		return this.storage.allTimeSpents()[this.todo.id] ?? 0;
	});

	timeWorked = computed(() => {
		return this.helper.workTimeSpent(this.allTime());
	});

	cycles = computed(() => {
		return this.helper.getCyclesCount(this.allTime());
	});

	timeEstimated(todo?: Todo) {
		if(!todo) return 0;

		return this.helper.getCyclesTime(todo.cycles);
	}
}
