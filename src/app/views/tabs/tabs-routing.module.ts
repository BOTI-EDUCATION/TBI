import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

import { AuthGuardService as AuthGuard } from '../../services/api/auth-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then((m) => m.HomePageModule),
          },
        ],
      },
      {
        path: 'profil',
        children: [
          {
            path: '',
            canActivate: [AuthGuard],
            loadChildren: () => import('../compte/compte.module').then((m) => m.ComptePageModule),
          },
          {
            path: 'login',
            loadChildren: () => import('../login/login.module').then((m) => m.LoginPageModule),
          },
          {
            path: 'password',
            loadChildren: () => import('../password/password.module').then((m) => m.PasswordPageModule),
          },
          {
            path: 'register',
            loadChildren: () => import('../register/register.module').then((m) => m.RegisterPageModule),
          },
          {
            path: 'compte',
            loadChildren: () => import('../compte/compte.module').then((m) => m.ComptePageModule),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
