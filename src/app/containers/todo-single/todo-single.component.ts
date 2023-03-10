import { Component, OnInit } from '@angular/core';

import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';
import { Observable, map, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'todo-single',
  template: `<div *ngIf="(todo$ | async) as todo">
    {{ todo.title }}
  </div>`,
})
export class TodoSingleComponent implements OnInit {
  todo$!: Observable<Todo>;
  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.todo$ = this.route.paramMap.pipe(
      map((params) => params.get('id')!),
      switchMap((id) => this.todoService.singleTodo$(id)!)
    );
  }
}
