import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'todo',
  template: `
    <div>
      <div *ngIf="!(loaded$ | async)">Loading...</div>
      <h3>All Todos</h3>
      <todo-item 
        *ngFor="let item of todos$ | async"
        [item]="item">
      </todo-item>
      <h3>Completed Items</h3>
        <todo-item 
          *ngFor="let item of completedTodos$ | async"
          [item]="item">
        </todo-item>
    </div>
  `,
})
export class TodoComponent implements OnInit {
  todos$!: Observable<Todo[]>;
  completedTodos$!: Observable<Todo[]>;
  loaded$!: Observable<boolean>;

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.todos$ = this.todoService.todos$;
    this.completedTodos$ = this.todoService.completedTodos$;
    this.loaded$ = this.todoService.loaded$;
  }
}
