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
import { SymbolsService } from '../services/symbols.service';
import { CurrencyDropdownSelectionObj, Symbols } from '../../types';
import { CurrencySelectComponent } from '../currency-select/currency-select.component';
import { SwitchButtonComponent } from '../switch-button/switch-button.component';
import { DropdownSharedService } from '../services/dropdown-shared.service';

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

  constructor(protected sharedService: DropdownSharedService) {
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
