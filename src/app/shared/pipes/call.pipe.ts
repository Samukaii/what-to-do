import { ChangeDetectorRef, EmbeddedViewRef, Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: 'call',
	standalone: true
})
export class CallPipe<C> implements PipeTransform {
	private readonly context: C;

	constructor(private cd: ChangeDetectorRef) {
		this.context = (this.cd as EmbeddedViewRef<C>).context;
	}


	transform<Args extends any[], Return>(fn: (...args: Args) => Return, ...params: Args): Return {
		return fn.apply(this.context, params as any);
	}
}

