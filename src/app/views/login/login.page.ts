import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUserService } from '../../services/api/app-user.service';
import { LoadingController, AlertController, ToastController, PopoverController } from '@ionic/angular';
import { LoggerService } from '@services/utils';
import { Router, ActivatedRoute } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isSubmited: boolean = false;
  snapshot: any;
  snapshot_id: any;

  code :string = '';
  codes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  private readonly TAG: string = 'LoginPage';
  
  pwdIcon = "eye-outline";
  showPwd = false;

  constructor(
    private logger: LoggerService,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private userPrv: AppUserService,
    private popoverCtrl: PopoverController,
    private router: Router,
    public toastController: ToastController,
    public signInWithApple: SignInWithApple,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
  ) {
    
    this.codes = this.codes.sort(() => Math.random() - 0.5);

    if (this.userPrv.isLoggedIn()) {
      //this.router.navigate(['/tabs/home']);
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.snapshot = params.snapshot as string;
      this.snapshot_id = params.snapshot_id as string;
    });
  }

  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? "eye-off-outline" : "eye-outline";
  }

  codeClick(code) {
   this.code = this.code +''+ code;
   if(this.code && this.code.length == 6){
    this.onSignIn();
   }
  }

  onSignIn() {
    this.userPrv.login({code: this.code}).subscribe(
      (res) => {
        this.code = '';
        this.logger.log(this.TAG, 'Signup Page', res);
        if (res) {
          this.popoverCtrl.dismiss({
            dismiss: true
          });
          let paramsSnap = {};
          if (this.snapshot && this.snapshot !== 'null') {
            paramsSnap = {
              id: this.snapshot_id,
            };
          }
          this.router.navigate([
            this.snapshot && this.snapshot !== 'null' ? this.snapshot : '/tabs/home',
            paramsSnap,
          ]);
        } else {
          this.alertError();
        }
      },
      (err) => console.log(err + '___'),
    );
  }

  async alertError() {
    const toast = await this.toastController.create({
      position: 'top',
      message: "Code pin erroné.",
      duration: 2000,
    });
    toast.present();
  }

  page_register() {
    this.router.navigate([
      '/tabs/profil/register',
      {
        snapshot: this.snapshot && this.snapshot !== 'null' ? this.snapshot : null,
      },
    ]);
  }

  page_password() {
    this.router.navigate([
      '/tabs/profil/password',
      {
        snapshot: this.snapshot && this.snapshot !== 'null' ? this.snapshot : null,
      },
    ]);
  }
}
