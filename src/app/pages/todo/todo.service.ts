import { effect, inject, Injectable, signal } from '@angular/core';
import { generateId } from 'src/app/shared/utils/id-generator';
import { TodoForm } from './models/todo-form';
import { Todo } from './models/todo';
import { FormValue } from "../../shared/types/form-value";
import { TrashService } from "../../shared/services/trash.service";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { TodoTimerService } from "./todo-timer.service";

@Injectable({
	providedIn: 'root'
})
export class TodoService {
	todos = signal(this.getStorage());
	saveListOnStorage = effect(() => {
		localStorage.setItem('list', JSON.stringify(this.todos()))
	})
	private trashKey = "todos";
	private trash = inject(TrashService);
	private timer = inject(TodoTimerService);

	delete(todo: Todo) {
		this.todos.update(todos => todos.filter((item, index) => {
			if(item.id === todo.id)
				this.trash.moveToTrash(this.trashKey, {
					item: todo,
					metadata: {
						index
					}
				});

			return item.id !== todo.id
		}));
	}

	toggle(todo: Todo) {
		this.todos.update(todos => todos.map(item => {
			if(item.id !== todo.id) return item

			return {
				...item,
				completed: !item.completed
			}
		}))
	}

	reorder(event: CdkDragDrop<Todo[]>) {
		const inFocus = this.currentInFocus();
		const allNotInFocus = this.todos().filter(todo => !todo.inFocus);

		const itemToMove = event.container.data[event.previousIndex];
		const itemsWithThisPriority = allNotInFocus.filter(item => item.priority === itemToMove.priority);
		const otherItems = allNotInFocus.filter(item => item.priority !== itemToMove.priority);

		moveItemInArray(itemsWithThisPriority, event.previousIndex, event.currentIndex);

		const newList = [
			...itemsWithThisPriority,
			...otherItems
		];

		if(inFocus) newList.unshift(inFocus);

		this.todos.set(newList);

		this.orderByPriority();
	}

	private orderByPriority() {
		const inFocus = this.todos().find(todo => todo.inFocus);
		const allNotInFocus = this.todos().filter(todo => !todo.inFocus);

		allNotInFocus.sort((previous, current) => current.priority - previous.priority)

		if(inFocus) allNotInFocus.unshift(inFocus);

		this.todos.set(allNotInFocus);
	}

	recover() {
		const deleted = this.trash.recoverLast<Todo, { index: number }>(this.trashKey);

		if(!deleted) return;

		this.todos.update(todos => {
			const newTodos = [...todos];
			newTodos.splice(deleted.metadata!.index, 0, deleted.item);

			return newTodos;
		});

		this.orderByPriority();
	}

	create(value: FormValue<TodoForm>) {
		const { title, description, cycles, priority } = value;
		if(!title) return;

		this.todos.update(items => [{
			id: generateId(),
			title,
			cycles,
			priority,
			description: description ?? "",
			completed: false,
			inFocus: false,
		}, ...items]);

		this.orderByPriority();
	}

	currentInFocus = () => this.todos().find(todo => todo.inFocus);

	focus(id: number) {
		this.todos.update(todos => {
			return todos.map(todo => {
				if(todo.id !== id) return {
					...todo,
					inFocus: false
				};

				return {
					...todo,
					inFocus: true
				}
			})
		});

		this.orderByPriority();

		this.timer.restart(this.currentInFocus()!.id)
	}

	update(id: number, changes: Partial<FormValue<TodoForm>>) {
		this.todos.update(todos => {
			return todos.map(todo => {
				if(todo.id !== id) return todo;

				return {
					...todo,
					...changes,
					description: changes.description ?? ""
				}
			})
		})

		this.orderByPriority();
	}


	private getStorage(): Todo[] {
		const fromStorage = localStorage.getItem('list') || "[]";

		return JSON.parse(fromStorage);
	}
}
