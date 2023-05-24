import { ComptePage } from './../compte/compte.page';
import { Component, InjectionToken, ViewChild } from '@angular/core';
import { Watchable } from '@models/utils';
import { AppReservationStorage } from '@services/security';
import { IonTabs, NavController, PopoverController } from '@ionic/angular';
import { PresencePage } from '@views/presence/presence.page';
import { RessourcesPage } from '@views/ressources/ressources.page';
import { LoginPage } from '@views/login/login.page';
import { CoursesPage } from '@views/courses/courses.page';
import { AppUserService } from '@services/api/app-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  private idW: Watchable<any> = new Watchable<any>();
  countPrestations: any;
  user: any;
  // APP_BASE_HREF: InjectionToken<string>;

  @ViewChild('tabs') tabs: IonTabs;

  constructor(
    private reservationStrg: AppReservationStorage,
    public navCtrl: NavController,
    private router: Router,
    private appUserService: AppUserService,
    private popoverCtrl: PopoverController,
  ) {
    this.user = this.appUserService.getUser();
  }

  ngOnInit() {
    this.appUserService.loggedInChange.subscribe((data) => {
      this.user = this.appUserService.getUser();
    });
  }

  async presence_page() {
    const modal = await this.popoverCtrl.create({
      component: PresencePage,
      cssClass: 'auto-height popover-right popover-presence my-custom-class',
      componentProps: {
        typePage: 'presence',
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data?.dismiss) {
      }
      if (result.data?.success) {
      }
    });
  }
  async compte_page() {
    const modal = await this.popoverCtrl.create({
      component: ComptePage,
      cssClass: 'auto-height popover-right popover-presence my-custom-class',
      componentProps: {
        typePage: 'compte',
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data?.dismiss) {
      }
      if (result.data?.success) {
      }
    });
  }

  async discipline_page() {
    const modal = await this.popoverCtrl.create({
      component: PresencePage,
      cssClass: 'auto-height popover-right popover-presence my-custom-class',
      componentProps: {
        typePage: 'discipline',
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data?.dismiss) {
      }
      if (result.data?.success) {
      }
    });
  }

  async ressources_page() {
    const modal = await this.popoverCtrl.create({
      component: RessourcesPage,
      cssClass: 'auto-height popover-right popover-ressources my-custom-class',
      componentProps: {
        typePage: 'ressources',
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data?.dismiss) {
      }
      if (result.data?.success) {
      }
    });
  }
  async courses_page() {
    const modal = await this.popoverCtrl.create({
      component: CoursesPage,
      cssClass: 'auto-height popover-right popover-ressources my-custom-class',
      componentProps: {
        typePage: 'courses',
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data?.dismiss) {
      }
      if (result.data?.success) {
      }
    });
  }

  async login_page() {
    const modal = await this.popoverCtrl.create({
      component: LoginPage,
      cssClass: 'auto-height popover-right popover-login my-custom-class',
      componentProps: {
        typePage: 'ressources',
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data?.dismiss) {
      }
      if (result.data?.success) {
      }
    });
  }

  logOut() {
    this.appUserService.logout();
    let rString = this.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    let paramsSnap = {};
    paramsSnap = {
      return: rString,
    };
    this.router.navigate(['/tabs/home', paramsSnap]);
  }

  randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  async openTab(tab: string, evt: MouseEvent) {
    const tabSelected = this.tabs.getSelected();
    evt.stopImmediatePropagation();
    evt.preventDefault();
    return tabSelected !== tab
      ? await this.navCtrl.navigateRoot(this.tabs.outlet.tabsPrefix + '/' + tab)
      : this.tabs.select(tab);
  }
}
