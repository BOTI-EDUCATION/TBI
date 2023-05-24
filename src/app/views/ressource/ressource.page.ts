import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { HomeProvider } from '@providers';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.page.html',
  styleUrls: ['./ressource.page.scss'],
})
export class RessourcePage implements OnInit {
  
  id: any;
  ressource: any;
  
  constructor(
    private popoverCtrl: PopoverController,
    private homePrv: HomeProvider,) { }

  ngOnInit() {
    this.homePrv.ressource(this.id).subscribe(
      async (res) => {
        this.ressource = res.ressource;
      },
      (err) => console.log(JSON.stringify(err)),
    );
  }
  
  close_modal(target = '') {
    this.popoverCtrl.dismiss({
      dismiss: true
    });
  }

}
