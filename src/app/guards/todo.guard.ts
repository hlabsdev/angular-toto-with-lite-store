import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, tap, of, filter, take, catchError } from 'rxjs';

import { TodoService } from '../services/todo.service';

@Injectable()
export class TodoGuard implements CanActivate {
  constructor(private todoService: TodoService) {}

  canActivate(): Observable<boolean> {
    return this.todoService.loaded$.pipe(
      tap((loaded) => loaded || this.todoService.loadTodos()),
      filter((loaded) => loaded),
      take(1),
      catchError(() => of(false))
    );
  }
}
