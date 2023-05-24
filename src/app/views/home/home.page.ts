import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

import { HomeData } from '@models/business';
import { LoggerService } from '@services/utils';
import { HomeProvider } from '@providers';
import { ModalController } from '@ionic/angular';

import { AppReservationStorage } from '@services/security';
import { ApiReservation } from '@models/security';
import { AppUserService } from '@services/api/app-user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  //encapsulation: ViewEncapsulation.None, // added
})
export class HomePage implements OnInit, OnDestroy {
  private readonly TAG: string = 'HomePage';
  scrollDepthTriggered = false;

  data: HomeData;
  user: any;
  reservationStorage = {} as ApiReservation;

  constructor(
    private logger: LoggerService,
    private homePrv: HomeProvider,
    private appUserService: AppUserService,
    private router: Router,
    private modalCtrl: ModalController,
    private reservationStrg: AppReservationStorage,
    private countdown: CountdownComponent,
  ) {
    this.user = this.appUserService.getUser();
  }

  ngOnInit() {
    this.logger.log(this.TAG, 'init');
    this.reservationStorage = this.reservationStrg.load();

    if(this.user){

      this.homePrv.data(this.reservationStorage.seance_id).subscribe(
        async (res) => {
          this.logger.log(this.TAG, 'home data', res);
          this.data = res;
  
          if(this.data.seance){
            this.reservationStorage.seance_id = this.data.seance.id;
            this.reservationStrg.save(this.reservationStorage);
          }
          
        },
        (err) => console.log(JSON.stringify(err)),
      );
    }

  }

  ngOnDestroy() {
    this.logger.log(this.TAG, 'destroy');
  }

  page_categorie(categorie) {
    this.router.navigate([
      '/tabs/home/categorie',
      {
        id: categorie,
      },
    ]);
  }

  page_specifique() {
    if(true){
      let navigationExtras: NavigationExtras = { state: { demande_specifique: true } };
      this.router.navigate(['/prestation'], navigationExtras);
    }
  }

  page_prestation(prestation) {
    this.router.navigate([
      '/tabs/home/prestation',
      {
        id: prestation.id,
      },
    ]);
  }

  page_giveaway(giveaway) {
    this.router.navigate([
      '/tabs/home/giveaway',
      {
        id: giveaway.id,
      },
    ]);
  }

  async logScrolling($event) {
    const currentScrollDepth = $event.detail.scrollTop;
    if (currentScrollDepth > 10) this.scrollDepthTriggered = true;
    else this.scrollDepthTriggered = false;
  }
}
