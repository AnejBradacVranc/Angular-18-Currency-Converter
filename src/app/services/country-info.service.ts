import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CountryInfo, CountryInfoRequestParams } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryInfoService {
  constructor(private apiService: ApiService) {}

  getCountryInfos(
    url: string,
    params: CountryInfoRequestParams
  ): Observable<CountryInfo[]> {
    return this.apiService.get(url, { params, responseType: 'json' });
  }
}
