import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ExchangeRateRequestParams, ExchangeRates } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ExchangeratesService {
  constructor(private apiService: ApiService) {}

  getExchangeRates(
    url: string,
    params: ExchangeRateRequestParams
  ): Observable<ExchangeRates> {
    return this.apiService.get(`${url}/${params.base}`);
  }
}
