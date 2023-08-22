import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Todo } from '../models/todo';
import { ButtonActionsFn } from '../../../shared/components/button/types/button-actions-fn';
import { TodoTimerService } from '../todo-timer.service';
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
    @Input({required: true}) current!: Todo;
    @Input() actionsFn: ButtonActionsFn<Todo> = () => [];

    timer = inject(TodoTimerService);

    poppoverComponent = TodoInfoComponent;

    showInfo() {
        this.poppover.open({
            todo: this.current
        })
    }

    closeInfo() {
        this.poppover.close();
    }
}
