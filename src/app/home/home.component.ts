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
import { Symbols } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InputGroupModule,
    InputGroupAddonModule,
    AutoCompleteModule,
    FormsModule,
    InputNumberModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  amount = 0;
  selectedCurrency: any;
  currencies: any[] = [];
  filteredCurrencies: any[] = [];

  constructor(
    private exchangerateService: ExchangeratesService,
    private symbolsService: SymbolsService
  ) {}

  ngOnInit() {
    this.currencies = [{ name: 'USD' }];

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
}
