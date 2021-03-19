import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CoinModel } from '../models/coin';

@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private url = 'https://api.binance.com/api/v3/ticker/price';

  notFoundCoinsList: CoinModel[] = [
    {
      symbol: 'BS',
      price: '1'
    },
    {
      symbol: 'PTR',
      price: '60'
    },
  ];

  listIdCoins: string[];

  constructor(private http: HttpClient) {
    this.listIdCoins = [
      'BTCUSDC',
      'ETHUSDC',
      'DASHBUSD',
      'EURBUSD'
    ];
  }

  getCoins() {
    return  this.http.get(this.url).pipe(
      map( (resp: CoinModel[]) => {
        let listCoins: CoinModel[] = this.notFoundCoinsList;
        this.listIdCoins.map(coin => {
          listCoins = [...listCoins, resp.find((item: CoinModel) => item.symbol === coin )];
        });
        return listCoins;
      })
    );
  }
}
