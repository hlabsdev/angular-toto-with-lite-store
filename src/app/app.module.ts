import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

// CONTAINERS
import { TodoComponent } from './containers/todo/todo.component';
import { TodoSingleComponent } from './containers/todo-single/todo-single.component';

// COMPONENTS
import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

// GUARDS
import { TodoGuard } from './guards/todo.guard';
import { TodoExistsGuard } from './guards/todo-exists.guard';

export const routes: Routes = [
  { path: '', component: TodoComponent, canActivate: [TodoGuard] },
  {
    path: ':id',
    component: TodoSingleComponent,
    canActivate: [TodoExistsGuard],
  },
  { path: '*', component: TodoComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoSingleComponent,
    TodoItemComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [TodoGuard, TodoExistsGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
