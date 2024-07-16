import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options{
    headers?: HttpHeaders | {
    [header: string]: string | string[];
    };
    observe?: "body";
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
  reportProgress?: boolean;
  responseType: "json";
  withCredentials?: boolean;
  transferCache?: | {includeHeaders?: string[];

  } | boolean;
}

export interface ExchangeRates {
    success: Boolean, 
    base: string, 
    timestamp: number, 
    rates: {
        [key: string]: number;
    }
}

export interface RequestParams{
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    api_key: string;
    base: string;
    currencies: string
}
