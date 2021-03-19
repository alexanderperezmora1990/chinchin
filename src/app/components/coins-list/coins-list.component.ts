import { Component, OnInit } from '@angular/core';
import { CoinModel } from 'src/app/models/coin';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-coins-list',
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.css']
})
export class CoinsListComponent implements OnInit {

  listCoins: CoinModel[] = [];

  constructor(
    private coinsService: CoinService
  ) {
    this.getCoins();
  }

  ngOnInit(): void {
      setInterval(() => {
        this.getCoins();
      }, 30000);
  }

  getCoins() {
    this.coinsService.getCoins().subscribe( resp => {
      this.listCoins = resp;
    });
  }

}
