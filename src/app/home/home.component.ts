import { Component } from '@angular/core';
import { ExchangeratesService } from '../services/exchangerates.service';
import { ExchangeRates } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private exchangerateService: ExchangeratesService) {}

  ngOnInit() {
    /*this.exchangerateService.getProducts("https://api.forexrateapi.com/v1/latest", {api_key:"99cca293e5982c0bdbd1940c35137b07", base: "EUR", currencies: ["USD", "INR", "JPY"].join(',')}).subscribe((exchangeRates: ExchangeRates)=>{
      console.log(exchangeRates.rates);
    })*/
  }
}
