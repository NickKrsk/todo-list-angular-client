import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  date?: any;
}

@Injectable({providedIn: 'root'})
export class TodosService {
  public todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todo[]> {
    /*return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=30')
      .pipe(tap(todos => this.todos = todos))*/

    return this.http.get<Todo[]>('http://localhost:3000/todos')
      .pipe(tap(todos => this.todos = todos));
  }

  onToggle(id: number) {
    const idx = this.todos.findIndex(t => t.id === id);
    this.todos[idx].completed = !this.todos[idx].completed;
  }

  removeTodo(id: number) {
    console.log(id);
    const res = this.http.delete(`http://localhost:3000/tasks/${id}`)
      .subscribe(response => console.log(response));
    this.todos = this.todos.filter(t => t.id !== id);
  }

  // `http://localhost:3000/add_task/${todo.title}`;
  addTodo(todo: Todo) {
    const req = 'http://localhost:3000/add_task';
    const title = todo.title;
    const body = { title };
    console.log(body);

    //headers.append('Content-Type', 'application/json; charset=utf-8');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        //'Content-Type': 'application/json',
        //'Content-Type': 'application/json; charset = utf-8',
      })
    }

    //const httpOptions = {headers: new HttpHeaders({'Content-Type':'application/json'})};

    //JSON.stringify({title})
    var params = `title=${title}`;
    const res = this.http.post(req, params, httpOptions)
        .subscribe(response => console.log(response));

   // console.log(res);
   // this.http.get(req);
    this.todos.push(todo);
  }
}
