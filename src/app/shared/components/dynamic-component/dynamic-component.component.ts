import {
	Component,
	ComponentRef,
	Input,
	OnChanges,
	SimpleChanges,
	TemplateRef,
	Type,
	ViewChild,
	ViewContainerRef
} from '@angular/core';
import { Generic } from '../../types/generic';

@Component({
	selector: 'app-dynamic-component',
	templateUrl: './dynamic-component.component.html',
	styleUrls: ['./dynamic-component.component.scss'],
	standalone: true
})
export class DynamicComponentComponent<T, C extends Generic> implements OnChanges {
	@ViewChild(TemplateRef, { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
	@Input({ required: true }) component!: Type<T>;
	@Input() context?: C;
	@Input() contextKey: string = "context";

	componentRef?: ComponentRef<T>;

	updateComponent() {
		this.container.clear();

		this.componentRef = this.container.createComponent(this.component);
	}

	updateContext() {
		if(typeof this.context !== "object")
			throw new Error("O contexto de um componente dinâmico precisa ser um objeto")

		const instance = this.componentRef!.instance as Generic;

		instance[this.contextKey] = this.context;

		this.componentRef?.changeDetectorRef.markForCheck();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(changes['component'])
			this.updateComponent();

		if(changes['context'])
			this.updateContext();
	}
}
