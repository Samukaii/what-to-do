import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
	selector: '[appVar]',
	standalone: true
})
export class VarDirective<T> implements OnInit{
	@Input()
	set appVar(context: any) {
		this.context.$implicit = this.context.appVar = context;
	}

	context: any = {};

	private viewRef = inject(ViewContainerRef);
	private templateRef = inject(TemplateRef);

	ngOnInit(): void {
		this.viewRef.clear();
		this.viewRef.createEmbeddedView(this.templateRef, this.context);
	}
}