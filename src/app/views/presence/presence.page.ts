import { Component, OnInit } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { LoggerService } from '@services/utils';
import { HomeProvider } from '@providers';

import { AppReservationStorage } from '@services/security';
import { ApiReservation } from '@models/security';
import { RetardPage } from '@views/retard/retard.page';
import { DisciplinePage } from '@views/discipline/discipline.page';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.page.html',
  styleUrls: ['./presence.page.scss'],
})
export class PresencePage implements OnInit {
  reservationStorage = {} as ApiReservation;

  eleves: any;
  seances: any;
  seance: any;
  toggleClasse: any;
  saveBtn: any;
  typePage: any;
  constructor(
    private logger: LoggerService,
    private homePrv: HomeProvider,
    private router: Router,
    public loadingController: LoadingController,
    private reservationStrg: AppReservationStorage,
    private popoverCtrl: PopoverController,
  ) {}

  ngOnInit() {
    this.reservationStorage = this.reservationStrg.load();
    this.get_eleves(this.reservationStorage.seance_id);
  }

  get_eleves(seance_id) {
    this.homePrv.eleves(seance_id).subscribe(
      async (res) => {
        console.log('hello');
        console.log(res);
        this.eleves = res.eleves;
        this.seances = res.seances;
        let seance = this.seances.filter((x) => x.id == this.reservationStorage.seance_id);
        if (seance) {
          this.seance = seance[0];
        }
      },
      (err) => console.log(JSON.stringify(err)),
      );
  }

  close_modal(target = '') {
    this.popoverCtrl.dismiss({
      dismiss: true,
    });
  }

  toggle_classe(seance = null) {
    if (seance) {
      this.saveBtn = false;
      this.reservationStorage.seance_id = seance.id;
      this.reservationStrg.save(this.reservationStorage);
      this.get_eleves(seance.id);
    }
    this.toggleClasse = !this.toggleClasse;
  }

  toggle_absent(eleve) {
    this.saveBtn = true;
    eleve.absent = !eleve.absent;
    if (eleve.absent) {
      eleve.retard = null;
    }
  }

  countAbsences() {
    if (!this.eleves) return '-';
    return this.eleves.filter((x) => x.absent == true).length + '/' + this.eleves.length;
  }

  countRetards() {
    if (!this.eleves) return '-';
    return this.eleves.filter((x) => x.retard > 0).length + '/' + this.eleves.length;
  }

  countPositives() {
    if (!this.eleves) return '-';
    return this.eleves.filter((x) => x.action_positive && x.action_positive.id).length + '/' + this.eleves.length;
  }

  countNegatives() {
    if (!this.eleves) return '-';
    return this.eleves.filter((x) => x.action_negative && x.action_negative.id).length + '/' + this.eleves.length;
  }

  async retard_page(eleve) {
    this.saveBtn = true;

    if (eleve.retard) {
      eleve.retard = null;
      return;
    }

    const modal = await this.popoverCtrl.create({
      component: RetardPage,
      cssClass: 'auto-height popover-right popover-retard my-custom-class',
      componentProps: {
        eleve: eleve,
        seance: this.seance,
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data?.dismiss) {
      }
      if (result.data?.minutes) {
        eleve.retard = result.data?.minutes;
        eleve.absent = null;
      }
    });
  }

  async discipline_page(eleve, action) {
    this.saveBtn = true;

    if (action && eleve.action_positive && eleve.action_positive.id) {
      eleve.action_positive.id = null;
      return;
    }

    if (!action && eleve.action_negative && eleve.action_negative.id) {
      eleve.action_negative.id = null;
      return;
    }

    const modal = await this.popoverCtrl.create({
      component: DisciplinePage,
      cssClass: 'auto-height popover-right popover-discipline my-custom-class',
      componentProps: {
        eleve: eleve,
        seance: this.seance,
        type: action,
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data?.dismiss) {
      }
      if (result.data?.action) {
        if (result.data?.type) {
          eleve.action_positive.id = result.data?.action;
          eleve.action_positive.commentaire = result.data?.commentaire;
        } else {
          eleve.action_negative.id = result.data?.action;
          eleve.action_negative.commentaire = result.data?.commentaire;
        }
      }
    });
  }

  async savePresence() {
    const loading = await this.loadingController.create({
      spinner: 'circular',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: false,
    });

    await loading.present();

    this.homePrv
      .save_presence('seance=' + this.seance.id + '&eleves=' + JSON.stringify(this.eleves), this.typePage)
      .subscribe(
        (res) => {
          loading.dismiss();

          let rString = this.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
          let paramsSnap = {};
          paramsSnap = {
            return: rString,
          };
          this.router.navigate(['/tabs/home', paramsSnap]);
          this.popoverCtrl.dismiss({
            dismiss: true,
          });
        },
        (err) => {
          loading.dismiss();
          this.popoverCtrl.dismiss({
            dismiss: true,
          });
          let rString = this.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
          let paramsSnap = {};
          paramsSnap = {
            return: rString,
          };
          this.router.navigate(['/tabs/home', paramsSnap]);
        },
      );
  }

  randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
}
