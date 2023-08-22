import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { TodoTimerHelperService } from "./todo-timer-helper.service";
import { TodoTimerStorageService } from "./todo-timer-storage.service";

@Injectable({
    providedIn: 'root'
})
export class TodoTimerService {
    isPaused = signal(true);
    allTimeSpent = signal(0);
    currentTodoId?: number;

    saveOnStorage = effect(() => {
        this.updateStorage(this.allTimeSpent());
    })

    private helper = inject(TodoTimerHelperService);
    private storage = inject(TodoTimerStorageService);

    currentCounterDecrescent = computed(() => this.helper.currentCounterDecrescent(this.allTimeSpent()));
    currentTotalCounter = computed(() => this.helper.currentTotalCounter(this.allTimeSpent()));
    cycles = computed(() => this.helper.getCyclesCount(this.allTimeSpent()));

    private intervalId = 0;


    resume() {
        const oneSecond = 1000;
        this.isPaused.set(false);

        this.intervalId = setInterval(this.updateCounter, oneSecond)
    }

    restart(todoId: number) {
        this.currentTodoId = todoId;
        clearInterval(this.intervalId);
        this.isPaused.set(true);
        this.allTimeSpent.set(this.storage.get(todoId) ?? 0);
    }

    pause() {
        clearInterval(this.intervalId);
        this.isPaused.set(true);
    }

    private updateCounter = () => {
        if(!this.currentTodoId) throw new Error("currentTodoId needs to be setted");
        this.allTimeSpent.update(current => current + 1);
        this.storage.save(this.currentTodoId, this.allTimeSpent());
    }
}
