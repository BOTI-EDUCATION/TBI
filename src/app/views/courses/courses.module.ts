import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CoursesPageRoutingModule } from './courses-routing.module';

import { CoursesPage } from './courses.page';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';

@NgModule({
  imports: [CommonModule, FormsModule, NgxYoutubePlayerModule.forRoot(), IonicModule, CoursesPageRoutingModule],
  declarations: [CoursesPage],
})
export class CoursesPageModule {}
