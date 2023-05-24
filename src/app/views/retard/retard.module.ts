import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RetardPageRoutingModule } from './retard-routing.module';

import { RetardPage } from './retard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RetardPageRoutingModule
  ],
  declarations: [RetardPage]
})
export class RetardPageModule {}
