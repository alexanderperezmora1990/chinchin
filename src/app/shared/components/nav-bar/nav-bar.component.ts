import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  hideLogOut: boolean = true;
  name: string;
  constructor(
    public sharedService: SharedService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.name = this.authService.readToken()[1];
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
