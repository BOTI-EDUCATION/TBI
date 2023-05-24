import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-retard',
  templateUrl: './retard.page.html',
  styleUrls: ['./retard.page.scss'],
})
export class RetardPage implements OnInit {

  
  eleve: any;
  seance: any;
  minutes: any = 5;
  constructor(
    private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }
  
  close_modal(target = '') {
    this.popoverCtrl.dismiss({
      dismiss: true
    });
  }
  
  save_modal(target = '') {
    this.popoverCtrl.dismiss({
      minutes: this.minutes
    });
  }

}
