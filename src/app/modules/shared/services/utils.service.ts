import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  toHttpParams(params) {
    return Object.getOwnPropertyNames(params)
                 .reduce((p, key) => p.set(key, params[key]), new HttpParams());
  }
}
