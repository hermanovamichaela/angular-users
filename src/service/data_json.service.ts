import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly URLData = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  resolveData(): Observable<any> {
    return this.http.get(this.URLData);
  }
}
