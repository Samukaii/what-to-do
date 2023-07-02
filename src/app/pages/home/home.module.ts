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
import { NoResultsComponent } from "../../shared/components/no-results/no-results.component";
import { HomeComponent } from './home.component';
import { TodoCreateComponent } from './todo-create/todo-create/todo-create.component';
import { TodoCreatorComponent } from './todo-creator/todo-creator.component';
import { TodoItemComponent } from './todo-list/todo-item/todo-item.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoTimeComponent } from './todo-time/todo-time.component';
import { TodoViewComponent } from './todo-view/todo-view.component';
import { ClockComponent } from 'src/app/shared/components/clock/clock.component';
import { CounterComponent } from "../../shared/components/counter/counter.component";


@NgModule({
    declarations: [
        TodoCreateComponent,
        TodoListComponent,
        HomeComponent,
        TodoItemComponent,
        TodoCreatorComponent,
        TodoViewComponent,
        TodoTimeComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        ButtonActionModule,
        InputComponent,
        TextareaComponent,
        NoResultsComponent,
        MatCheckboxModule,
        ClockComponent,
        TabsComponent,
        CounterComponent
    ]
})
export class HomeModule { }
