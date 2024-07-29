import { Component } from '@angular/core';
import { ExchangeratesService } from '../services/exchangerates.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import {
  CountryInfo,
  CurrencyDropdownSelectionObj,
  CurrencyInfo,
  ExchangeRates,
} from '../../types';
import { CurrencySelectComponent } from '../currency-select/currency-select.component';
import { SwitchButtonComponent } from '../switch-button/switch-button.component';
import { DropdownSharedService } from '../services/dropdown-shared.service';
import { CountryInfoService } from '../services/country-info.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    AutoCompleteModule,
    FormsModule,
    InputNumberModule,
    CurrencySelectComponent,
    SwitchButtonComponent,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  amount = 0;
  convertedAmount = 0;

  isConversionHidden = true;

  currencyFrom: CurrencyDropdownSelectionObj = { name: '' };
  currencyTo: CurrencyDropdownSelectionObj = { name: '' };

  currencyCodes: any[] = [];
  currencyInfos: Map<string, CurrencyInfo> = new Map();
  exchangeRates: ExchangeRates = {
    base: '',
    date: new Date(),
    provider: '',
    timeLastUpdated: 0,
    rates: {},
  };

  constructor(
    protected sharedService: DropdownSharedService,
    private countryInfoService: CountryInfoService,
    private exchangerateService: ExchangeratesService
  ) {
    this.sharedService.currencyFrom$.subscribe(
      (val: CurrencyDropdownSelectionObj) => {
        this.currencyFrom = val;
      }
    );

    this.sharedService.currencyTo$.subscribe(
      (val: CurrencyDropdownSelectionObj) => {
        this.currencyTo = val;
      }
    );
    this.exchangerateService
      .getExchangeRates('https://api.exchangerate-api.com/v4/latest', {
        base: 'EUR',
      })
      .subscribe((exchangeRates: ExchangeRates) => {
        this.exchangeRates = exchangeRates;
      });
  }

  protected setExchangeRates() {
    this.exchangerateService
      .getExchangeRates('https://api.exchangerate-api.com/v4/latest', {
        base: this.currencyFrom.name,
      })
      .subscribe((exchangeRates: ExchangeRates) => {
        console.log(exchangeRates);
        this.exchangeRates = exchangeRates;
      });
  }

  ngOnInit() {
    this.countryInfoService
      .getCountryInfos('https://restcountries.com/v3.1/all', {
        fields: 'currencies',
        status: true,
      })
      .subscribe((data: CountryInfo[]) => {
        data.forEach((value: CountryInfo) => {
          this.currencyInfos.set(
            Object.entries(value.currencies).map(([key, _]) => {
              return key;
            })[0],
            Object.entries(value.currencies).map(([_, value]) => {
              return value;
            })[0]
          );

          this.currencyCodes.push(
            Object.entries(value.currencies).map(([key, _]) => {
              return key;
            })[0]
          );
        });

        var arr = [...new Set(this.currencyCodes)].sort();

        arr = arr.filter((value) => {
          if (value === undefined) return false;
          else return true;
        });

        this.currencyCodes = arr.map((value) => {
          return { name: value };
        });
      });
  }

  swapCurrencies() {
    const temp = this.currencyFrom;
    this.currencyFrom = this.currencyTo;
    this.currencyTo = temp;

    // Update service with swapped values
    this.sharedService.setCurrencyFrom(this.currencyFrom);
    this.sharedService.setCurrencyTo(this.currencyTo);

    this.isConversionHidden = true;
    this.setExchangeRates();
  }

  convert() {
    this.convertedAmount =
      this.amount * this.exchangeRates.rates[this.currencyTo.name];
  }

  onConvert() {
    this.convert();
    this.isConversionHidden = false;
  }
}
