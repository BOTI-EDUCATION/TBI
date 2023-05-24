import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { HomeProvider } from '@providers';
import { RessourcePage } from '@views/ressource/ressource.page';

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.page.html',
  styleUrls: ['./ressources.page.scss'],
})
export class RessourcesPage implements OnInit {
  eleve: any;
  matiere: any;
  type: any;
  actions: any;
  data: any;
  ressources: any;

  action: any;
  commentaire: any;
  slideTypes = {
    loop: false,
    slidesPerView: 3.2,
    spaceBetween: 20,
    breakpoints: {
      640: {
        slidesPerView: 3,
      },
    },
  };
  constructor(private popoverCtrl: PopoverController, private homePrv: HomeProvider) {}

  ngOnInit() {
    this.homePrv.ressources_collapses().subscribe(
      async (res) => {
        this.data = res;
      },
      (err) => console.log(JSON.stringify(err)),
    );
  }

  set_action(action) {
    console.log('action', action);
    this.action = action;
  }

  matiere_click(niveau, matiere) {
    this.matiere = matiere;
    this.getRessources(niveau.id, matiere.id);
  }

  close_modal(target = '') {
    this.popoverCtrl.dismiss({
      dismiss: true,
    });
  }

  getRessources(niveau, matiere) {
    this.homePrv.ressources(niveau, matiere).subscribe(
      async (res) => {
        this.ressources = res.ressources;
      },
      (err) => console.log(JSON.stringify(err)),
    );
  }

  async ressource_page(id) {
    const modal = await this.popoverCtrl.create({
      component: RessourcePage,
      cssClass: 'auto-height popover-right popover-ressource my-custom-class',
      componentProps: {
        id: id,
      },
    });
    await modal.present();
    await modal.onDidDismiss().then((result) => {
      if (result.data?.dismiss) {
      }
    });
  }

  save_modal(target = '') {
    if (this.action)
      this.popoverCtrl.dismiss({
        type: this.type,
        action: this.action,
        commentaire: this.commentaire,
      });
  }
}
