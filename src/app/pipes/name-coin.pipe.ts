import { Pipe, PipeTransform } from '@angular/core';
import { CoinModel } from '../models/coin';

@Pipe({
  name: 'nameCoin'
})
export class NameCoinPipe implements PipeTransform {

  coinDictionary = {
    BTCUSDC: 'Bitcoin',
    ETHUSDC: 'Ethereum',
    DASHBUSD: 'Dash',
    EURBUSD: 'Euro',
    BS: 'Bolivares Soberanos',
    PTR: 'Petros'
  }

  transform(coin: CoinModel, ...args: unknown[]): unknown {
    return this.coinDictionary[coin.symbol];
  }

}
