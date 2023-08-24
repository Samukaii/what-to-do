import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonAction } from '../button-raised/button-action-raised.component';
import { ThemePalette } from '@angular/material/core';

@Component({
	selector: 'app-button-action-icon',
	templateUrl: './button-action-icon.component.html',
	styleUrls: ['./button-action-icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonActionIconComponent implements ButtonAction {
	@Input() options!: {
		icon: string;
		color: ThemePalette;
	}
}
