import { Component } from '@angular/core';
import { ExchangeratesService } from '../services/exchangerates.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
} from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { CountryInfo, CurrencyDropdownSelectionObj } from '../../types';
import { CurrencySelectComponent } from '../currency-select/currency-select.component';
import { SwitchButtonComponent } from '../switch-button/switch-button.component';
import { DropdownSharedService } from '../services/dropdown-shared.service';
import { CountryInfoService } from '../services/country-info.service';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  amount = 0;

  currencyFrom: CurrencyDropdownSelectionObj = { name: '' };
  currencyTo: CurrencyDropdownSelectionObj = { name: '' };

  currencyCodes: any[] = [];
  currencyInfos: Map<string, any> = new Map();

  constructor(
    protected sharedService: DropdownSharedService,
    private countryInfoService: CountryInfoService
  ) {
    this.sharedService.currencyFrom$.subscribe(
      (val: CurrencyDropdownSelectionObj) => {
        this.currencyFrom = val;
        this.onHandleCurrencyChange();
      }
    );

    this.sharedService.currencyTo$.subscribe(
      (val: CurrencyDropdownSelectionObj) => {
        this.currencyTo = val;
        this.onHandleCurrencyChange();
      }
    );
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
            Object.entries(value.currencies).map(([key, value]) => {
              return key;
            })[0],
            Object.entries(value.currencies).map(([key, value]) => {
              return value;
            })[0]
          );

          this.currencyCodes.push(
            Object.entries(value.currencies).map(([key, value]) => {
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

    console.log('Currencies swapped');
  }

  onHandleCurrencyChange() {
    if (this.currencyFrom.name == this.currencyTo.name) {
      this.sharedService.currencyFrom$.subscribe((val) => console.log(val));
      console.log('Bomboclat');
    }
  }
}
