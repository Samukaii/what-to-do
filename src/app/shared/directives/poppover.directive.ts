import { ComponentRef, Directive, ElementRef, inject, Input, OnDestroy, Renderer2, Type } from "@angular/core";
import { Overlay, OverlayRef, PositionStrategy } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";

export interface PoppoverConfig {
	origin: ElementRef | HTMLElement;
}

@Directive({
	selector: '[appPoppover]',
	standalone: true
})
export class PoppoverDirective<T> implements OnDestroy {
	@Input({ required: true }) poppoverComponent!: Type<T>;

	overlayRef?: OverlayRef;
	componentRef!: ComponentRef<T>;

	private elementRef = inject(ElementRef);
	private renderer = inject(Renderer2);
	private overlay = inject(Overlay);

	open(info: Partial<T>, config?: PoppoverConfig) {
		this.overlayRef?.detach();

		this.overlayRef = this.overlay.create({
			hasBackdrop: false,
			disposeOnNavigation: true,
			positionStrategy: this.getOverlayPosition(config?.origin ?? this.elementRef),
			scrollStrategy: this.overlay.scrollStrategies.close()
		});


		this.componentRef = this.overlayRef.attach(
			new ComponentPortal(this.poppoverComponent)
		);

		this.applyPoppoverContext(info);
		this.listenMouseLeave(
			config?.origin instanceof ElementRef
				? config.origin.nativeElement
				: config?.origin ?? this.elementRef.nativeElement
		);
	}

	close() {
		this.overlayRef?.detach();
		this.unlistenMouseLeaveOfPoppover();
	}

	ngOnDestroy() {
		this.close();
	}

	private applyPoppoverContext(info: Partial<T>) {
		Object.keys(info).forEach(key => {
			const property = info[key as keyof T]
			if(property)
				this.componentRef.instance[key as keyof T] = property;
		});
		this.componentRef.changeDetectorRef.markForCheck();
	}

	private unlistenMouseLeaveOfPoppover = () => {
	};

	private listenMouseLeave(element: HTMLElement) {
		this.unlistenMouseLeaveOfPoppover = this.renderer.listen(
			element,
			'mouseleave',
			() => {
				this.close()
			}
		);
	}

	private getOverlayPosition(origin: ElementRef | HTMLElement): PositionStrategy {
		return this.overlay
			.position()
			.flexibleConnectedTo(origin)
			.withPositions([
				{
					originX: 'center',
					originY: 'bottom',
					overlayX: 'center',
					overlayY: 'top',
				},
				{
					originX: 'center',
					originY: 'top',
					overlayX: 'center',
					overlayY: 'bottom',
				},
			]);
	}

}