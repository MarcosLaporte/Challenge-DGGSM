import { Observable } from 'rxjs';

export interface DatabaseService<T> {
  getAll(): Observable<T[]>;
  get(id: any): Observable<T>;
  post(data: T): Observable<{}>;
  put(newData: {}): Observable<{}>;
  delete(id: any): Observable<{}>;
}
