import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { TabData } from "../../../../shared/components/tabs/models/tab-data";
import { Todo } from "../../models/todo";
import { ButtonActionsFn } from "../../../../shared/components/button/types/button-actions-fn";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { TodoInfoComponent } from "../../info/todo-info.component";
import { PoppoverDirective } from "../../../../shared/directives/poppover.directive";

@Component({
	selector: 'app-todo-list-by-priority',
	templateUrl: './todo-list-by-priority.component.html',
	styleUrls: ['./todo-list-by-priority.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListByPriorityComponent implements TabData {
	@ViewChild(PoppoverDirective) poppover!: PoppoverDirective<TodoInfoComponent>;

	tabData!: {
		items: Todo[];
		actionsFn: ButtonActionsFn<Todo>;
		toggle: (todo: Todo) => void;
		reorder: (reordered: CdkDragDrop<Todo[]>) => void;
	};

	poppoverComponent = TodoInfoComponent;

	showInfo(todo: Todo, origin: HTMLElement) {
		this.poppover.open({ todo }, { origin })
	}

	reorder(event: CdkDragDrop<Todo[]>){
		this.tabData.reorder(event);
	}
}
