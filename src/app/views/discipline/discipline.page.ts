import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { HomeProvider } from '@providers';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.page.html',
  styleUrls: ['./discipline.page.scss'],
})
export class DisciplinePage implements OnInit {
  eleve: any;
  seance: any;
  type: any;
  actions: any;

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
    this.homePrv.get_actions(this.type).subscribe(
      async (res) => {
        this.actions = res.actions;
      },
      (err) => console.log(JSON.stringify(err)),
    );
  }

  set_action(action) {
    console.log('action', action);
    this.action = action;
  }

  close_modal(target = '') {
    this.popoverCtrl.dismiss({
      dismiss: true,
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
