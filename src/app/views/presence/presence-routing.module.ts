import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresencePage } from './presence.page';

const routes: Routes = [
  {
    path: '',
    component: PresencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresencePageRoutingModule {}
