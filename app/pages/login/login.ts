import {Page, NavController, MenuController, Alert} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignupPage} from '../signup/signup';
import {UserData} from '../../providers/user-data';


@Page({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(private nav: NavController, private userData: UserData, private menu: MenuController) {}
  
  onLogin(form) {
    this.submitted = true;
    if (form.valid) {
        // Authenticate with Firebase
        var ref = this.userData.firebaseRef();
        ref.authWithPassword({
          "email"     : form.controls.username.value,
          "password"  : form.controls.password.value
        }, (error, authData) => {
        if (error) {
            let alert = Alert.create({
              title: 'Login Failed',
              subTitle: 'Please check your username and/or password and try again',
              buttons: ['Ok']
            });
            this.nav.present(alert);
        } else {
            console.log("Authenticated successfully with payload:", authData);
            this.userData.login(form.controls.username.value, form.controls.password.value);
            this.nav.push(TabsPage);
        }
      });
    }
  }

  onSignup() {
    this.nav.push(SignupPage);
  }
  
  onPageDidEnter() {
    this.menu.enable(false);
    this.menu.swipeEnable(false);
  }
  
  onPageDidLeave() {
    this.menu.enable(true);
    this.menu.swipeEnable(true);
  }
  
}