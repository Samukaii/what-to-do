import { Component } from '@angular/core';
import { Tab } from 'src/app/shared/components/tabs/models/tab';
import { TodoCreatorComponent } from './todo-creator/todo-creator.component';
import { TodoViewComponent } from './todo-view/todo-view.component';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tabs: Tab[] = [
    {
      component: TodoCreatorComponent,
      label: "Criar tarefa"
    },
    {
      component: TodoViewComponent,
      label: "Ver tarefas"
    },
  ];
}
