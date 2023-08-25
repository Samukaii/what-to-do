import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Todo } from '../models/todo';
import { ButtonActionsFn } from "../../../shared/components/button/types/button-actions-fn";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { TodoInfoComponent } from "../info/todo-info.component";
import { PoppoverDirective } from "../../../shared/directives/poppover.directive";
import { TodoPriorityEnum } from "../models/todo-priority.enum";


type Group<T, K extends keyof T> = { [k in K]: T[k] } & { list: T[] };


export const groupByProperty = <T, K extends keyof T>(list: T[], property: K) => {
	const groupped: Group<T, K>[] = [];

	list.forEach(item => {
		const group = groupped.find(group => group[property] === item[property])

		if(group) {
			group.list.push(item);
			return;
		}

		groupped.push({
			[property]: item[property],
			list: [item]
		} as Group<T, K>)

	})

	return groupped;
}


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
	poppoverComponent = TodoInfoComponent;

	@Input() actionsFn: ButtonActionsFn<Todo> = () => [];

	showInfo(todo: Todo, origin: HTMLElement) {
		this.poppover.open({ todo }, { origin })
	}

	todosByPriorities(all: Todo[]) {
		return groupByProperty(all, 'priority');
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

	closeInfo() {
		this.poppover.close();
	}
}
