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
      .pipe(map((res) => res.filter((el) => this.isArea(el))));
  }

  get(id: number): Observable<Area> {
    return this.http.get<Area>(`${PATH}/${id}`);
  }

  post(data: Area): Observable<any> {
    return this.http.post(PATH, data);
  }

  put(id: number, newData: any): Observable<any> {
    if (newData.hasOwnProperty('id'))
      console.warn('El ID del área no puede modificarse.');

    return this.http.post(`${PATH}/${id}`, newData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${PATH}/${id}`);
  }
}
