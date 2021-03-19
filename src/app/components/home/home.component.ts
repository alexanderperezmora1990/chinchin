import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardModel } from 'src/app/models/card';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  listaCard: CardModel[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    public sharedService: SharedService
  ) {

    this.listaCard = [
      {
        title: 'Dólares Nacionales',
        body: '0,00  USD NAC',
        background: 'linear-gradient(338deg,#2e7a10,#8dbc3a)'
      },

      {
        title: 'Bolívares Soberanos',
        body: '0,00  BS',
        background: 'linear-gradient(338deg,#691b23,#b97a80)'
      },

      {
        title: 'Bitcoin',
        body: '0,000000000  BTC',
        background: 'linear-gradient(338deg,#ea8a16,#f9aa4b)'
      },

      {
        title: 'Euros',
        body: '0,00  EUR',
        background: 'linear-gradient(338deg,#001489,#1d3eff)'
      },

      {
        title: 'Dólares Internacionales',
        body: '0,00  USD INT',
        background: '#2a5124'
      }


    ];

  }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
