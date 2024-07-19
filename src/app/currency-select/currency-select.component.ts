import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AutoCompleteCompleteEvent,
  AutoCompleteModule,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownSharedService } from '../services/dropdown-shared.service';
import { ExchangeratesService } from '../services/exchangerates.service';
import { SymbolsService } from '../services/symbols.service';
import { CurrencyDropdownSelectionObj } from '../../types';

@Component({
  selector: 'app-currency-select',
  standalone: true,
  imports: [InputNumberModule, AutoCompleteModule, FormsModule],
  templateUrl: './currency-select.component.html',
  styleUrl: './currency-select.component.scss',
})
export class CurrencySelectComponent {
  @Input() label = '';
  @Input() inputId = '';

  currencies: any[] = [];

  @Input() selectedCurrency: any;
  @Output() selectedCurrencyChange =
    new EventEmitter<CurrencyDropdownSelectionObj>();
  @Output() currencyChange = new EventEmitter<CurrencyDropdownSelectionObj>();

  filteredCurrencies: any[] = [];

  constructor(
    private exchangerateService: ExchangeratesService,
    private symbolsService: SymbolsService
  ) {}

  ngOnInit() {
    /*this.symbolsService
      .getSymbols('https://api.forexrateapi.com/v1/symbols', {
        api_key: '99cca293e5982c0bdbd1940c35137b07',
      })
      .subscribe((symbols: Symbols) => {
        this.currencies = Object.entries(symbols.symbols).map(
          ([key, value]) => {
            return { name: key };
          }
        );
      });*/

    /*this.exchangerateService.getExchangeRates("https://api.forexrateapi.com/v1/latest", {api_key:"99cca293e5982c0bdbd1940c35137b07", base: "EUR", currencies: ["USD", "INR", "JPY"].join(',')}).subscribe((exchangeRates: ExchangeRates)=>{
      console.log(exchangeRates.rates);
    })*/

    this.currencies = [{ name: 'USD' }, { name: 'EUR' }];
    //this.selectedCurrency = this.initialCurrency;
  }

  filterCurrencies(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.currencies as any[]).length; i++) {
      let currency = (this.currencies as any[])[i];
      if (currency.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(currency);
      }
    }

    this.filteredCurrencies = filtered;
  }

  onSelectionEvent(event: AutoCompleteSelectEvent) {
    this.selectedCurrencyChange.emit(this.selectedCurrency);
    this.currencyChange.emit(this.selectedCurrency);
  }
}
