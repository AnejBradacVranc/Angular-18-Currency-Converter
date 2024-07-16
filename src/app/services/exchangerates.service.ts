import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ExchangeRates, RequestParams } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ExchangeratesService {
  constructor(private apiService: ApiService) {}

  getProducts = (
    url: string,
    params: RequestParams
  ): Observable<ExchangeRates> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };
}
