import { Observable } from 'rxjs';

export interface DatabaseService<T> {
  getAll(): Observable<T[]>;
  get(id: any): Observable<T>;
  post(data: T): Observable<any>;
  put(id: any, newData: any): Observable<any>;
  delete(id: any): Observable<any>;
}
