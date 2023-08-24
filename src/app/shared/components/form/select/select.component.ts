import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BaseSelect } from "../../../models/base-select";
import { MatSelectModule } from "@angular/material/select";

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	standalone: true,
	imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, CommonModule, MatSelectModule],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {
	@Input({ required: true }) name!: string;
	@Input() label?: string;
	@Input() placeholder?: string;
	@Input() options: BaseSelect[] = [];

	container = inject(ControlContainer);
	form!: FormGroup;

	ngOnInit() {
		this.form = this.container.control as FormGroup;
	}
}
