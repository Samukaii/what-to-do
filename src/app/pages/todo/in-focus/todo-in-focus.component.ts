import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Todo } from '../models/todo';
import { ButtonActionsFn } from '../../../shared/components/button/types/button-actions-fn';
import { TodoInfoComponent } from "../info/todo-info.component";
import { PoppoverDirective } from "../../../shared/directives/poppover.directive";

@Component({
	selector: 'app-todo-in-focus',
	templateUrl: './todo-in-focus.component.html',
	styleUrls: ['./todo-in-focus.component.scss']
})
export class TodoInFocusComponent {
	@ViewChild(PoppoverDirective) poppover!: PoppoverDirective<TodoInfoComponent>;
	@Output() toggle = new EventEmitter<Todo>();
	@Input({ required: true }) current!: Todo;
	poppoverComponent = TodoInfoComponent;

	@Input() actionsFn: ButtonActionsFn<Todo> = () => [];

	showInfo() {
		this.poppover.open({
			todo: this.current
		})
	}

	closeInfo() {
		this.poppover.close();
	}
}
