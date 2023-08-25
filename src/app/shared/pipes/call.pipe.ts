import { ChangeDetectorRef, EmbeddedViewRef, inject, Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'call',
	standalone: true
})
export class CallPipe<C> implements PipeTransform {
	private viewRef = inject(ChangeDetectorRef) as EmbeddedViewRef<C>;

	transform<Args extends any[], Return>(fn: (...args: Args) => Return, ...params: Args): Return {
		return fn.apply(this.viewRef.context, params as any);
	}
}

