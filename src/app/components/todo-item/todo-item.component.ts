import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../../models/todo.model';

@Component({
  selector: 'todo-item',
  template: ` <div>
    <a [routerLink]="['', item.id]">
      {{ item.title }}
      {{ item.completed ? '✅' : '❌' }}
    </a>
  </div>`,
})
export class TodoItemComponent implements OnInit {
  @Input()
  item!: Todo;

  constructor() {}

  ngOnInit() {}
}
