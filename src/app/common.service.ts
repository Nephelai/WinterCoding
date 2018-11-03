import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class CommonService {

  constructor(private http: Http) { }

  saveTodo(user) {
    return this.http.post('http://localhost:6092/api/SaveTodo/', user)
      .pipe(
        map((response: Response) => response.json())
      );
  }

  GetTodo() {
    return this.http.get('http://localhost:6092/api/getTodo/')
      .pipe(
        map((response: Response) => response.json())
      );
  }

  deleteTodo(id) {
    return this.http.post('http://localhost:6092/api/deleteTodo/', {'id': id})
      .pipe(
        map((response: Response) => response.json())
      );
  }

  revertTodo(id, value) {
    return this.http.post('http://localhost:6092/api/revertTodo/', {'id': id, 'done': value})
      .pipe(
        map((response: Response) => response.json())
      );
  }
}
