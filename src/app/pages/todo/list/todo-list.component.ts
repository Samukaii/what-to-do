import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Todo } from '../models/todo';
import { ButtonActionsFn } from "../../../shared/components/button/types/button-actions-fn";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { TodoInfoComponent } from "../info/todo-info.component";
import { PoppoverDirective } from "../../../shared/directives/poppover.directive";
import { TodoPriorityEnum } from "../models/todo-priority.enum";
import { buildComponentTab, Tab } from "../../../shared/components/tabs/models/tab";
import { TodoListByPriorityComponent } from "./list-by-priority/todo-list-by-priority.component";
import { groupByProperty } from "../../../shared/utils/group-by-property";


@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
	@ViewChild(PoppoverDirective) poppover!: PoppoverDirective<TodoInfoComponent>;

	@Output() toggle = new EventEmitter<Todo>();
	@Output() reorder = new EventEmitter<CdkDragDrop<Todo[]>>();
	@Input({ required: true }) items!: Todo[];

	@Input() actionsFn: ButtonActionsFn<Todo> = () => [];

	getTabs(todos: Todo[]): Tab[] {
		const groupped = groupByProperty(todos, 'priority');

		return groupped.map((group) => {
			return {
				name: group.priority.toString(),
				label: this.priorityName(group.priority),
				component: buildComponentTab(TodoListByPriorityComponent, {
					items: group.list,
					actionsFn: this.actionsFn,
					reorder: event => this.reorder.emit(event),
					toggle: todo => this.toggle.emit(todo)
				})
			}
		})
	}

	priorityName(priorityId: TodoPriorityEnum) {
		switch(priorityId) {
			case TodoPriorityEnum.LOW:
				return "Prioridade baixa";
			case TodoPriorityEnum.MEDIUM:
				return "Prioridade média";
			case TodoPriorityEnum.HIGH:
				return "Prioridade alta";
		}
	}
}
