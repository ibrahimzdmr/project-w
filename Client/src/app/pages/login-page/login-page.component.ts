import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AlertService } from 'src/app/components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/common/authentication.service';
import { login } from 'src/app/store/actions/login.action';
import { State } from 'src/app/store/reducer/reducer';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(readonly auth: AuthenticationService,
              readonly store: Store<{ state: State }>,
              readonly alertService: AlertService) { }

  username: string | undefined;
  password: string | undefined;

  ngOnInit(): void {
    //this.auth.login("asd","1234").subscribe(i => { this.store.dispatch(login(i));});
  }

  login(){
    console.log(this.username, this.password);
  }

  tt(){
    this.alertService.alert({alertInfo:{message:'asdqweqweqwasdqasdqweqweqwasdqweqweqweqweqwdasdascxzcxzdsdasdqweqweqweqweqwdasdascxzcxzdsdeqweqwdasdascxzcxzdsdasdqweqweqwasdqweqweqweqweqwdasdascxzcxzdsdasdqweqweqweqweqwdasdascxzcxzdsdeqweqwdasdascxzcxzdsdasdqweqweqwasdqweqweqweqweqwdasdascxzcxzdsdasdqweqweqweqweqwdasdascxzcxzdsdeqweqwdasdascxzcxzdsdasdqweqweqwasdqweqweqweqweqwdasdascxzcxzdsdasdqweqweqweqweqwdasdascxzcxzdsdeqweqwdasdascxzcxzdsdasdqweqweqwasdqweqweqweqweqwdasdascxzcxzdsdasdqweqweqweqweqwdasdascxzcxzdsdeqweqwdasdascxzcxzdsdasdqweqweqwasdqweqweqweqweqwdasdascxzcxzdsdasdqweqweqweqweqwdasdascxzcxzdsdeqweqwdasdascxzcxzdsdweqweqweqweqwdasdascxzcxzdsdasdqweqweqweqweqwdasdascxzcxzdsdeqweqwdasdascxzcxzdsd', type:'success'}});
  }

}
