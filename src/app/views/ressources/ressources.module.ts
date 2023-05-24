import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RessourcesPageRoutingModule } from './ressources-routing.module';

import { RessourcesPage } from './ressources.page';
import { ExpandableModule } from '../../components/expandable/expandable.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ExpandableModule,  RessourcesPageRoutingModule],
  declarations: [RessourcesPage],
})
export class RessourcesPageModule {}
