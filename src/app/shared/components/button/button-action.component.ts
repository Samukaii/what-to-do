import { ChangeDetectionStrategy, Component, HostListener, Input, OnChanges, SimpleChanges, Type } from '@angular/core';
import { getComponent } from './registrations';
import { ButtonAction } from './types/button-action';
import { Generic } from '../../types/generic';


@Component({
	selector: 'app-button-action',
	templateUrl: './button-action.component.html',
	styleUrls: ['./button-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonActionComponent<T = void> implements OnChanges {
	@Input({ required: true }) action!: ButtonAction;

	config?: {
		component: Type<any>;
		options: Generic;
	}

	ngOnChanges(changes: SimpleChanges): void {
		if(changes['action']) {
			this.config = {
				component: getComponent(this.action.type),
				options: this.action.options || {}
			}
		}
	}

	@HostListener('click')
	onClick() {
		this.action.click();
	}
}
