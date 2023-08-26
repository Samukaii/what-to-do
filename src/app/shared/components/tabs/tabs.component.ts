import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicComponentComponent } from '../dynamic-component/dynamic-component.component';
import { Tab } from './models/tab';
import { CallPipe } from "../../pipes/call.pipe";
import { ComponentType } from "@angular/cdk/overlay";
import { Generic } from "../../types/generic";

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss'],
	imports: [CommonModule, MatTabsModule, MatIconModule, DynamicComponentComponent, CallPipe],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
	@Input() tabs: Tab[] = [];
	@Input() padding = 1;

	getComponentInfo(tab: Tab): { name: ComponentType<Generic>, options: Generic} {
		const component = tab.component;
		if('options' in component) return component;

		return {
			name: component,
			options: {}
		}
	}

	identifyBy = (index: number, tab: Tab) => tab.name;
}
