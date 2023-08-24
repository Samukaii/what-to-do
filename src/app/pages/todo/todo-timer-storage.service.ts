import { effect, Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class TodoTimerStorageService {
	allTimeSpents = signal<Record<number, number>>(this.getAll());
	private storageKey = `todo-time-spent`;
	saveOnStorage = effect(() => {
		localStorage.setItem(this.storageKey, JSON.stringify(this.allTimeSpents()))
	})

	save(id: number, allTimeSpent: number) {
		this.allTimeSpents.update(all => ({
			...all,
			[id]: allTimeSpent
		}));
	}

	get(id: number): number | undefined {
		return this.allTimeSpents()[id];
	}

	private getAll(): Record<number, number> {
		return JSON.parse(localStorage.getItem(this.storageKey) || "{}");
	}
}
