import { Directive, ElementRef, Input, Type } from "@angular/core";
import { Overlay, OverlayRef, PositionStrategy } from "@angular/cdk/overlay";
import { ComponentPortal } from "@angular/cdk/portal";

@Directive({
    selector: '[appPoppover]',
    standalone: true
})
export class PoppoverDirective<T> {
    @Input({required: true}) poppoverComponent!: Type<T>;

    overlayRef?: OverlayRef;

    constructor(
        private elementRef: ElementRef,
        private overlay: Overlay,
    ) {
    }

    open(info: Partial<T>) {
        this.overlayRef = this.overlay.create({
            hasBackdrop: false,
            disposeOnNavigation: true,
            positionStrategy: this.getOverlayPosition(this.elementRef),
            scrollStrategy: this.overlay.scrollStrategies.close()

        });

        const componentRef = this.overlayRef.attach(
            new ComponentPortal(this.poppoverComponent)
        );

        Object.keys(info).forEach(key => {
            const property = info[key as keyof T]
            if(property)
            componentRef.instance[key as keyof T] = property;
        });
        componentRef.changeDetectorRef.markForCheck();
    }

    close(){
        this.overlayRef?.detach();
    }

    private getOverlayPosition(origin: ElementRef): PositionStrategy {
        return this.overlay
            .position()
            .flexibleConnectedTo(origin)
            .withPositions([
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top',
                },
            ]);
    }

}