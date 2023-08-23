import { ChangeDetectionStrategy, Component, computed, HostBinding, inject } from '@angular/core';
import { Todo } from "../models/todo";
import { TodoTimerHelperService } from "../todo-timer-helper.service";
import { TodoTimerStorageService } from "../todo-timer-storage.service";

@Component({
	selector: 'app-todo-info',
	templateUrl: './todo-info.component.html',
	styleUrls: ['./todo-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInfoComponent {
	todo!: Todo;

	helper = inject(TodoTimerHelperService);
	storage = inject(TodoTimerStorageService);

	allTime = computed(() => {
		return this.storage.allTimeSpents()[this.todo.id] ?? 0;
	});

	timeWorked = computed(() => {
		return this.helper.workTimeSpent(this.allTime());
	});

	cycles = computed(() => {
		return this.helper.getCyclesCount(this.allTime());
	});

	@HostBinding("class.mat-elevation-z2") elevation = true;

	timeEstimated(todo?: Todo) {
		if(!todo) return 0;

		return this.helper.getCyclesTime(todo.cycles);
	}
}
