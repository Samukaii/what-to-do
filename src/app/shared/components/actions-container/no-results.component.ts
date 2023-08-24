import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-no-results',
	templateUrl: './no-results.component.html',
	styleUrls: ['./no-results.component.scss'],
	standalone: true,
	imports: [CommonModule, MatIconModule],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoResultsComponent {
	@Input({ required: true }) icon!: string;
	@Input({ required: true }) label!: string;
	@Input() description?: string;
}
