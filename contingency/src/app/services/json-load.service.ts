// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonLoadService {
  constructor(private http: HttpClient) {}

  loadData(address: string): Observable<any> {
    return this.http.get<any>(address);
  }
}
