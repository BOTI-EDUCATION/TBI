import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RessourcePageRoutingModule } from './ressource-routing.module';

import { RessourcePage } from './ressource.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfViewerModule,
    RessourcePageRoutingModule
  ],
  declarations: [RessourcePage]
})
export class RessourcePageModule {}
