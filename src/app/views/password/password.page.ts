import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUserService } from '../../services/api/app-user.service';
import { LoadingController, AlertController, ToastController, NavController } from '@ionic/angular';
import { LoggerService } from '@services/utils';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  public passwordForm: FormGroup;
  isSubmited: boolean = false;
  snapshot: any;
  snapshot_id: any;

  private readonly TAG: string = 'PasswordPage';

  constructor(
    private logger: LoggerService,
    private userPrv: AppUserService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private nav: NavController,
    private router: Router,
    public toastController: ToastController,
    private route: ActivatedRoute,
    public loadingController: LoadingController,
  ) {
    this.passwordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.snapshot = params.snapshot as string;
      this.snapshot_id = params.snapshot_id as string;
    });
  }

  onSignIn() {
    if (this.passwordForm.valid) {
      this.userPrv.forgot_password(this.passwordForm.value.email).subscribe(
        (res) => {
          this.logger.log(this.TAG, 'Signup Page', res);
          this.passwordForm.reset();
          if (res.success) {
            this.nav.navigateRoot('/tabs/profil/login');
            this.alertDone(res);
          } else {
            this.alertError(res.error);
          }
        },
        (err) => console.log(err + '___'),
      );
    }
  }

  async alertDone(res) {
    const alert = await this.alertController.create({
      cssClass: 'chic-choc-alert',
      header: res.title,
      message: res.message,
      buttons: ['Fermer'],
    });

    await alert.present();
  }

  async alertError(message) {
    const toast = await this.toastController.create({
      position: 'top',
      message: message,
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
}
