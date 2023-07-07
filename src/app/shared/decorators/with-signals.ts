export const WithSignals = () => {
  return function (constructor: Function) {
    constructor.prototype.ngOnChanges = () => {}
  }
}
