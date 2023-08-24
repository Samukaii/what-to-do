import { Pipe, PipeTransform } from "@angular/core";
import { TimeHelpers } from "../utils/time-helpers";

@Pipe({
	name: 'secondsToTime',
	standalone: true
})
export class SecondsToTimePipe implements PipeTransform {
	transform(value: number): string {
		return TimeHelpers.secondsToTime(value);
	}
}
