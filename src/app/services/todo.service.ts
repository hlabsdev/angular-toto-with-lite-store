import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store, StoreEntity } from '@ultimate/lite-store';
import { Todo } from '../models/todo.model';

interface TodoState extends StoreEntity<Todo> {
  loaded: boolean;
}

const initialState: TodoState = {
  ids: [],
  entities: {},
  loaded: false,
};

const getTodos = (state: TodoState) =>
  state.ids.map((id) => state.entities[id]);
const getLoadedTodos = (state: TodoState) => state.loaded;
const getSingleTodo = (id: string) => (state: TodoState) => state.entities[id];

@Injectable({
  providedIn: 'root',
})
export class TodoService extends Store<TodoState> {
  get todos$() {
    return this.select(getTodos);
  }

  get completedTodos$() {
    return this.select(
      this.createSelector(getTodos, (todos) =>
        todos.filter((todo) => todo.completed)
      )
    );
  }

  get loaded$() {
    return this.select(getLoadedTodos);
  }

  singleTodo$(id: string) {
    return this.select(getSingleTodo(id));
  }

  constructor(private http: HttpClient) {
    super(initialState);
  }

  loadTodos() {
    // this.http.get...
    const todos = [
      { id: 'x8jslk', title: 'Eat Pizza', completed: false },
      { id: '8sls0L', title: 'Do State Management', completed: true },
      { id: 'aebd71', title: 'Get Some Sleep', completed: false },
      { id: 'kJla00', title: 'Repeat Yesterday', completed: false },
    ];

    const entities = this.toEntities(todos);

    this.setState(() => ({
      entities,
      loaded: true,
    }));
  }

  addTodo(todo: Todo) {
    this.setState(({ entities }) => ({
      entities: {
        ...entities,
        [todo.id]: todo,
      },
    }));
  }

  removeTodo(id: Todo['id']) {
    this.setState((state) => {
      const { [id]: removed, ...entities } = state.entities;
      return { entities };
    });
  }
}
