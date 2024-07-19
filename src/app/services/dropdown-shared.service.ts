import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { CurrencyDropdownSelectionObj } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class DropdownSharedService {
  private currencyFrom: BehaviorSubject<CurrencyDropdownSelectionObj> =
    new BehaviorSubject<CurrencyDropdownSelectionObj>({ name: 'EUR' });
  private currencyTo: BehaviorSubject<CurrencyDropdownSelectionObj> =
    new BehaviorSubject<CurrencyDropdownSelectionObj>({ name: 'USD' });

  currencyFrom$ = this.currencyFrom.asObservable();
  currencyTo$ = this.currencyTo.asObservable();

  setCurrencyFrom(data: CurrencyDropdownSelectionObj) {
    this.currencyFrom.next(data);
  }

  setCurrencyTo(data: CurrencyDropdownSelectionObj) {
    this.currencyTo.next(data);
  }

  constructor() {}
}
