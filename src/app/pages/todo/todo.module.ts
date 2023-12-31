import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ButtonActionModule } from 'src/app/shared/components/button/button-action.module';
import { TabsComponent } from 'src/app/shared/components/tabs/tabs.component';
import { InputComponent } from "../../shared/components/form/input/input.component";
import { TextareaComponent } from "../../shared/components/form/textarea/textarea.component";
import { ActionsContainerComponent } from "../../shared/components/no-results/actions-container.component";
import { TodoComponent } from './todo.component';
import { TodoFormComponent } from './form/todo-form.component';
import { TodoItemComponent } from './list/item/todo-item.component';
import { TodoListComponent } from './list/todo-list.component';
import { TodoTimeComponent } from './time/todo-time.component';
import { ClockComponent } from 'src/app/shared/components/clock/clock.component';
import { CounterComponent } from "../../shared/components/counter/counter.component";
import { TodoUpdateComponent } from "./update/todo-update.component";
import { TodoCreateComponent } from "./create/todo-create.component";
import { FormComponent } from "../../shared/components/form/form/form.component";
import { NoResultsComponent } from "../../shared/components/actions-container/no-results.component";
import { CdkDrag, CdkDropList, CdkDropListGroup } from "@angular/cdk/drag-drop";
import { SecondsToTimePipe } from "../../shared/pipes/seconds-to-time.pipe";
import { CyclesCounterComponent } from "../../shared/components/cycles-counter/cycles-counter.component";
import { TodoInFocusComponent } from './in-focus/todo-in-focus.component';
import { PoppoverDirective } from "../../shared/directives/poppover.directive";
import { TodoInfoComponent } from "./info/todo-info.component";
import { SelectComponent } from "../../shared/components/form/select/select.component";
import { CallPipe } from "../../shared/pipes/call.pipe";
import { TodoListByPriorityComponent } from "./list/list-by-priority/todo-list-by-priority.component";
import { VarDirective } from "../../shared/directives/var.directive";


@NgModule({
	declarations: [
		TodoInFocusComponent,
		TodoFormComponent,
		TodoUpdateComponent,
		TodoListComponent,
		TodoComponent,
		TodoItemComponent,
		TodoCreateComponent,
		TodoTimeComponent,
		TodoInfoComponent,
		TodoListByPriorityComponent
	],
	imports: [
		CommonModule,
		CallPipe,
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		ButtonActionModule,
		InputComponent,
		TextareaComponent,
		ActionsContainerComponent,
		MatCheckboxModule,
		ClockComponent,
		TabsComponent,
		CounterComponent,
		FormComponent,
		NoResultsComponent,
		CdkDropList,
		CdkDrag,
		SecondsToTimePipe,
		CyclesCounterComponent,
		PoppoverDirective,
		SelectComponent,
		CdkDropListGroup,
		VarDirective
	]
})
export class TodoModule {
}
