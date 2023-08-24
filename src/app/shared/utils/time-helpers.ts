export class TimeHelpers {
	static secondsToTime(timeInSeconds: number) {
		const oneMinuteInSeconds = 60;
		const oneHourInSeconds = oneMinuteInSeconds * 60;

		let hours: string | number = Math.floor(timeInSeconds / oneHourInSeconds);
		let minutes: string | number = Math.floor((timeInSeconds % oneHourInSeconds) / oneMinuteInSeconds);
		let seconds: string | number = Math.floor((timeInSeconds % oneHourInSeconds) % oneMinuteInSeconds)

		hours = hours.toString().padStart(2, '0')
		minutes = minutes.toString().padStart(2, '0')
		seconds = seconds.toString().padStart(2, '0')

		if(hours !== "00")
			return `${ hours }:${ minutes }:${ seconds }`;

		return `${ minutes }:${ seconds }`;
	}
}
