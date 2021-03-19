import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../models/auth';
import { map } from 'rxjs/operators';
import { UserModel } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyDsriqPVrz6j9ah5O30mPdPoZUXXC3TF3k';

  private userToken: string;
  private displayName: string;

  constructor(private http: HttpClient) { }

  login( user: AuthModel ) {

    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(`${ this.url }/verifyPassword?key=${ this.apikey }`, authData).pipe( map( resp => {
        this.saveToken( resp['idToken'],  resp['displayName']);
        return resp;
      })
    );

  }

  newUser( user: UserModel ) {

    const authData = {
      ...user,
      returnSecureToken: true
    };

    return this.http.post(`${ this.url }/signupNewUser?key=${ this.apikey }`, authData).pipe(
      map( resp => {
        return resp;
      })
    );

  }

  private saveToken( idToken: string, displayName: string ) {

    this.userToken = idToken;
    localStorage.setItem('tokenFirebase', idToken);

    const day = new Date();
    day.setSeconds( 3600 );

    localStorage.setItem('displayName', displayName);

    localStorage.setItem('expire', day.getTime().toString() );


  }

  readToken() {

    if ( localStorage.getItem('tokenFirebase') ) {
      this.userToken = localStorage.getItem('tokenFirebase');
      this.displayName = localStorage.getItem('displayName');
    } else {
      this.userToken = '';
      this.displayName = '';
    }

    return [

      this.userToken,
      this.displayName
    ];

  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    if ( !localStorage.getItem('tokenFirebase') ) {
      return false;
    }

    const expire = Number(localStorage.getItem('expire'));
    const expireDate = new Date();
    expireDate.setTime(expire);

    if ( expireDate > new Date() ) {
      return true;
    } else {
      return false;
    }


  }
}
