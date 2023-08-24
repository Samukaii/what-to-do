import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DynamicComponentComponent } from '../dynamic-component/dynamic-component.component';
import { Tab } from './models/tab';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss'],
	imports: [CommonModule, MatTabsModule, MatIconModule, DynamicComponentComponent],
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent {
	@Input() tabs: Tab[] = [];
}
