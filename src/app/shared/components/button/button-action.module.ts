import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonActionRaisedComponent } from './button-actions/button-raised/button-action-raised.component';
import { ButtonActionIconComponent } from './button-actions/action-icon/button-action-icon.component';
import { ButtonActionComponent } from './button-action.component';
import { DynamicComponentComponent } from '../dynamic-component/dynamic-component.component';


@NgModule({
	declarations: [
		ButtonActionRaisedComponent,
		ButtonActionIconComponent,
		ButtonActionComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		DynamicComponentComponent,
	],
	exports: [
		ButtonActionComponent
	]
})
export class ButtonActionModule {
}
