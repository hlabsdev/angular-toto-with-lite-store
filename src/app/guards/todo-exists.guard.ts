import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, map, take, switchMap, catchError } from 'rxjs';

import { TodoService } from '../services/todo.service';
import { TodoGuard } from './todo.guard';

@Injectable()
export class TodoExistsGuard implements CanActivate {
  constructor(private todoService: TodoService, private todoGuard: TodoGuard) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const id = route.paramMap.get('id');

    return this.todoGuard.canActivate().pipe(
      switchMap(() =>
        this.todoService.singleTodo$(id).pipe(map(Boolean), take(1))
      ),
      catchError(() => of(false))
    );
  }
}
