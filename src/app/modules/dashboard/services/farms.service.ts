import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/shareReplay';
import { Farm } from '../../shared/models/api/farm';
import { Config } from '../../shared/services/config';
import { UtilsService } from '../../shared/services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class FarmsService {

  constructor(private http: HttpClient, private utilsService: UtilsService) { }

  getFarms(paramsObj: any): Observable<Farm[]> {
    const url = `${Config.API_ENDPOINT}farms`;
    return this.http.get<Farm[]>(url, {params: this.utilsService.toHttpParams(paramsObj)});
  }
}
