import { Injectable } from '@angular/core';
import { TimerStepName } from "../../shared/models/timer-step-name";

@Injectable({
	providedIn: 'root'
})
export class TodoTimerHelperService {
	getCyclesCount(timeInSeconds: number) {
		return Math.floor(this.workTimeSpent(timeInSeconds) / (25 * 60));
	}

	getCyclesTime(cycles: number) {
		const completed = Math.floor(cycles / 4);
		const remaining = cycles % 4;

		return completed * 130 + remaining * 30;
	}

	currentTotalCounterByStepName(stepName: TimerStepName) {
		switch(stepName) {
			case "work":
				return 25 * 60;
			case "short-rest":
				return 5 * 60;
			case "long-rest":
				return 15 * 60;
		}
	}

	currentTotalCounter(timeInSeconds: number) {
		const stepName = this.currentStepName(timeInSeconds)
		return this.currentTotalCounterByStepName(stepName)
	}

	currentCounterDecrescent(timeInSeconds: number) {
		switch(this.currentStepName(timeInSeconds)) {
			case "short-rest":
				return (5 * 60) - (this.shortRestTimeSpent(timeInSeconds) % (5 * 60));
			case "work":
				return (25 * 60) - (this.workTimeSpent(timeInSeconds) % (25 * 60));
			case "long-rest":
				return (15 * 60) - (this.longRestTimeSpent(timeInSeconds) % (15 * 60));
		}
	}

	longRestTimeSpent(timeInSeconds: number) {
		const longCycles = Math.floor(timeInSeconds / (130 * 60));
		const remaining = timeInSeconds - (longCycles * 130 * 60);

		return (longCycles * (15 * 60)) + Math.max(remaining - (115 * 60), 0);
	}

	shortRestTimeSpent(timeInSeconds: number) {
		const longCycles = Math.floor(timeInSeconds / (130 * 60));
		const remainingLongTime = Math.min(timeInSeconds % (130 * 60), 115 * 60);

		const shortCycles = Math.floor(remainingLongTime / (30 * 60));
		const shortTimeRemaining = remainingLongTime % (30 * 60);

		return (longCycles * 3 * (5 * 60)) + (shortCycles * (5 * 60)) + (Math.max(shortTimeRemaining - (25 * 60), 0));
	}

	workTimeSpent(timeInSeconds: number) {
		return (timeInSeconds - this.shortRestTimeSpent(timeInSeconds) - this.longRestTimeSpent(timeInSeconds))
	}

	currentStepName(timeInSeconds: number): TimerStepName {
		const all = this.inMinutes(timeInSeconds);

		const completeLongCycle = 130;
		const longCycleBeforeLongRest = 115;
		const completeShortCycle = 30;
		const shortCycleBeforeShortRest = 25;

		if(all % completeLongCycle >= longCycleBeforeLongRest) return "long-rest";

		if((all % completeLongCycle) % completeShortCycle >= shortCycleBeforeShortRest) return "short-rest";

		return "work";
	}

	private inMinutes(seconds: number) {
		return Math.floor(seconds / 60);
	}
}
