import { Injectable } from '@angular/core';
import { RequestParams, Symbols } from '../../types';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SymbolsService {
  constructor(private apiService: ApiService) {}

  getSymbols = (url: string, params: RequestParams): Observable<Symbols> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };
}
