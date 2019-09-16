import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/shareReplay';
import { Farm } from '../../shared/models/api/farm';
import { Config } from '../../shared/services/config';

@Injectable({
  providedIn: 'root'
})
export class FarmsService {

  constructor(private http: HttpClient) { }

  getFarms(): Observable<Farm[]> {
    const url = `${Config.API_ENDPOINT}farms`;
    return this.http.get<Farm[]>(url);
  }
}
