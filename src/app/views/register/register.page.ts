import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUserService } from '../../services/api/app-user.service';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { LoggerService } from '@services/utils';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { HomeProvider } from '@providers';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  //encapsulation: ViewEncapsulation.None, // added
})
export class RegisterPage implements OnInit {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Morocco, CountryISO.France];

  public registerForm: FormGroup;
  isSubmited: boolean = false;
  snapshot: any;
  snapshot_id: any;

  private readonly TAG: string = 'RegisterPage';

  pwdIcon = "eye-outline";
  showPwd = false;
  pays: any;

  constructor(
    private logger: LoggerService,
    private userPrv: AppUserService,
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    private homePrv: HomeProvider,
    private router: Router,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
  ) {
    this.registerForm = formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', Validators.nullValidator],
      pays_id: ['', Validators.nullValidator],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
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

  async onSignUp() {
    console.log('onSignUp');
    if (this.registerForm.valid) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration: 3000,
      });
      await loading.present();
      //this.registerForm.value.tel = this.registerForm.value.tel.e164Number;
      this.userPrv.signup(this.registerForm.value).subscribe(
        (res) => {
          this.logger.log(this.TAG, 'Signup Page', res);
          if (res.success) {
            this.registerForm.reset();
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
            this.alertError(res);
          }
        },
        (err) => console.log(err + '___'),
      );
    }
  }

  async alertError(res) {
    const errors = Object.values(res.errors);
    const toast = await this.toastController.create({
      position: 'top',
      message: errors.join(', '),
      duration: 2000,
    });
    toast.present();
  }

  page_login() {
    this.router.navigate([
      '/tabs/profil/login',
      {
        snapshot: this.snapshot && this.snapshot !== 'null' ? this.snapshot : null,
      },
    ]);
  }
}
