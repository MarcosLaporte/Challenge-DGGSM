import { Injectable } from '@angular/core';
import { DatabaseService } from './DatabaseService';
import { Area } from '../utils';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const PATH: string = '/api/areas';
@Injectable({
  providedIn: 'root',
})
export class AreaService implements DatabaseService<Area> {
  constructor(private http: HttpClient) {}

  private isArea(data: any): boolean {
    return data.hasOwnProperty('id') && data.hasOwnProperty('area');
  }

  getAll(): Observable<Area[]> {
    return this.http
      .get<Area[]>(PATH)
      .pipe(
        map((res) =>
          res
            .filter((el) => this.isArea(el))
            .map((el) => ({ id: el.id, area: el.area }))
        )
      );
  }

  get(id: number): Observable<Area> {
    throw new Error('Method not implemented.');
  }

  post(data: Area): Observable<any> {
    return this.http.post(PATH, data);
  }

  put(id: number, newData: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
