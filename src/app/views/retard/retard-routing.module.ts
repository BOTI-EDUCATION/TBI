import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RetardPage } from './retard.page';

const routes: Routes = [
  {
    path: '',
    component: RetardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RetardPageRoutingModule {}
