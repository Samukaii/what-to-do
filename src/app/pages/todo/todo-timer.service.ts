import { computed, inject, Injectable, signal } from '@angular/core';
import { TodoTimerHelperService } from "./todo-timer-helper.service";
import { TodoTimerStorageService } from "./todo-timer-storage.service";

@Injectable({
	providedIn: 'root'
})
export class TodoTimerService {
	status = signal<"stopped" | "playing" | "paused">("stopped");
	allTimeSpent = signal(0);
	currentTodoId?: number;

	private helper = inject(TodoTimerHelperService);
	currentCounterDecrescent = computed(() => this.helper.currentCounterDecrescent(this.allTimeSpent()));
	currentTotalCounter = computed(() => this.helper.currentTotalCounter(this.allTimeSpent()));
	cycles = computed(() => this.helper.getCyclesCount(this.allTimeSpent()));
	private storage = inject(TodoTimerStorageService);
	private intervalId = 0;

	resume() {
		const oneSecond = 1000;
		this.status.set("playing");

		this.intervalId = setInterval(this.updateCounter, oneSecond)
	}

	restart(todoId: number) {
		this.currentTodoId = todoId;
		clearInterval(this.intervalId);
		this.status.set("playing");
		this.allTimeSpent.set(this.storage.get(todoId) ?? 0);

		this.resume();
	}

	pause() {
		clearInterval(this.intervalId);
		this.status.set("paused");
	}

	private updateCounter = () => {
		if(this.status() !== "playing") return;

		if(!this.currentTodoId) throw new Error("currentTodoId needs to be setted");

		this.allTimeSpent.update(current => current + 1);
		this.storage.save(this.currentTodoId, this.allTimeSpent());
	}
}
