import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { generateId } from 'src/app/shared/utils/id-generator';
import { TodoForm } from './models/todo-form';
import { Todo } from './models/todo';
import { FormValue } from "../../shared/types/form-value";
import { TrashService } from "../../shared/services/trash.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";

type CounterType = 'work' | 'short-rest' | 'long-rest';

@Injectable({
  providedIn: 'root'
})
export class TodoTimerService {
  counterType = signal<CounterType>('work');
  isPaused = signal(true);
  currentCounterSize = computed(() => {
    switch (this.counterType()) {
      case "work":
        return 25 * 60;
      case "short-rest":
        return 5 * 60;
      case "long-rest":
        return 15 * 60;
    }
  });
  currentTime = signal(this.currentCounterSize());
  private cycles = signal(0);
  private intervalId = 0;

  resume() {
    const oneSecond = 1000;
    this.isPaused.set(false);

    this.intervalId = setInterval(this.updateCounter, oneSecond)
  }

  reset() {
    clearInterval(this.intervalId);
    this.isPaused.set(true);
    this.currentTime.set(this.currentCounterSize());
  }

  pause() {
    clearInterval(this.intervalId);
    this.isPaused.set(true);
  }

  private updateCounter = () => {
    this.currentTime.update(current => {
      return current - 1;
    });
    this.verifyCycleEnd();
  }

  private verifyCycleEnd() {
    if (this.currentTime() <= 0) {
      this.nextCounterType();
      this.reset();
    }
  }

  private nextCounterType() {
    if (this.counterType() === "short-rest" || this.counterType() === "long-rest") {
      this.counterType.set("work");
      return;
    }

    if (this.isAtCycleEnd()) this.counterType.set("long-rest");
    else this.counterType.set("short-rest");
  }

  private isAtCycleEnd() {
    const maxCycleSize = 4;

    return this.cycles() % maxCycleSize === 0;
  }
}
