import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoForm } from '../models/todo-form';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormValue } from "../../../shared/types/form-value";
import { ButtonAction } from "../../../shared/components/button/types/button-action";
import { DialogService } from "../../../shared/services/dialog.service";
import { createTodoForm } from "../form/create-todo-form";

@Component({
	selector: 'app-todo-create',
	templateUrl: './todo-create.component.html',
	styleUrls: ['./todo-create.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoCreateComponent {
	data: {
		onSend: (form: FormValue<TodoForm>) => void;
	} = inject(MAT_DIALOG_DATA);

	dialog = inject(DialogService);

	form = createTodoForm();
	actions: ButtonAction[] = [
		{
			type: "raised",
			click: () => this.onSend(),
			options: {
				color: "primary",
				text: "Salvar"
			}
		}
	]

	onSend() {
		this.dialog.close()
		this.data.onSend(this.form.getRawValue());
	}
}
