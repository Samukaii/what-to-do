import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Todo } from '../models/todo';
import { ButtonActionsFn } from "../../../shared/components/button/types/button-actions-fn";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { TodoInfoComponent } from "../info/todo-info.component";
import { PoppoverDirective } from "../../../shared/directives/poppover.directive";

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
	@ViewChild(PoppoverDirective) poppover!: PoppoverDirective<TodoInfoComponent>;

	@Output() toggle = new EventEmitter<Todo>();
	@Output() reorder = new EventEmitter<CdkDragDrop<Todo>>();
	@Input({ required: true }) items!: Todo[];
	poppoverComponent = TodoInfoComponent;

	@Input() actionsFn: ButtonActionsFn<Todo> = () => [];

	showInfo(todo: Todo, origin: HTMLElement) {
		this.poppover.open({ todo }, { origin })
	}

	closeInfo() {
		this.poppover.close();
	}
}
