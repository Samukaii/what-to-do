import { Component, computed, HostListener, inject } from '@angular/core';
import { TodoService } from "./todo.service";
import { Todo } from "./models/todo";
import { ButtonAction } from "../../shared/components/button/types/button-action";
import { DialogService } from "../../shared/services/dialog.service";
import { TodoUpdateComponent } from "./update/todo-update.component";
import { TodoCreateComponent } from "./create/todo-create.component";
import { ButtonActionsFn } from "../../shared/components/button/types/button-actions-fn";
import { CdkDragDrop } from "@angular/cdk/drag-drop";


@Component({
	templateUrl: './todo.component.html',
	styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
	service = inject(TodoService);
	todoInFocus = computed(() => {
		return this.service.todos().find(todo => todo.inFocus);
	});

	otherTodos = computed(() => {
		return this.service.todos().filter((todo) => !todo.inFocus);
	});

	dialog = inject(DialogService);

	actionsFn = computed<ButtonActionsFn<Todo>>(() => {
		return (todo): ButtonAction[] => [
			{
				type: "icon",
				click: () => this.focus(todo),
				condition: !todo.inFocus,
				options: {
					color: "primary",
					icon: "play_circle"
				}
			},
			{
				type: "icon",
				click: () => this.edit(todo),
				options: {
					color: "primary",
					icon: "edit"
				}
			},
			{
				type: "icon",
				click: () => this.delete(todo),
				options: {
					color: "warn",
					icon: "delete"
				}
			}
		]
	})

	createButtonFn = (): ButtonAction[] => [{
		type: "raised",
		click: () => this.create(),
		options: {
			icon: "add",
			color: "primary",
			text: "Nova tarefa"
		}
	}];

	@HostListener('window:keydown.control.z')
	recover() {
		this.service.recover();
	}

	focus(todo: Todo) {
		this.service.focus(todo.id);
	}

	edit(todo: Todo) {
		this.dialog.open(TodoUpdateComponent, {
			data: {
				todo,
				onSend: changes => this.service.update(todo.id, changes)
			}
		})
	}

	delete(todo: Todo) {
		this.service.delete(todo)
	}

	toggle(todo: Todo) {
		this.service.toggle(todo)
	}

	reorder(event: CdkDragDrop<Todo>) {
		this.service.reorder(event);
	}

	create() {
		this.dialog.open(TodoCreateComponent, {
			data: {
				onSend: changes => this.service.create(changes)
			}
		})
	}
}
