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
  success: Boolean;
  base: string;
  timestamp: number;
  rates: {
    [key: string]: number;
  };
}

export interface RequestParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  api_key: string;
}

export interface ExchangeRateRequestParams extends RequestParams {
  base: string;
  currencies: string;
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
