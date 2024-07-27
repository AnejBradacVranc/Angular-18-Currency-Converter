import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType: 'json';
  withCredentials?: boolean;
  transferCache?: { includeHeaders?: string[] } | boolean;
}

export interface ExchangeRates {
  base: string;
  date: Date;
  provider: string;
  timeLastUpdated: number;
  rates: {
    [key: string]: number;
  };
}

export interface ExchangeRateRequestParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  base: string;
}

export interface CurrencyDropdownSelectionObj {
  name: string;
}

export interface CountryInfoRequestParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  status: boolean;
  fields: string;
}

export interface CountryInfo {
  currencies: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
}

export interface CurrencyInfo {
  name: string;
  symbol: string;
}
