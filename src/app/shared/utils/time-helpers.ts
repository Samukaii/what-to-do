export class TimeHelpers {
  static secondsToTime(timeInSeconds: number){
    let minutes: string | number = Math.floor(timeInSeconds / 60)
    let seconds: string | number = (timeInSeconds - minutes * 60)

    minutes = minutes.toString().padStart(2, '0')
    seconds = seconds.toString().padStart(2, '0')

    return `${minutes}:${seconds}`;
  }
}
